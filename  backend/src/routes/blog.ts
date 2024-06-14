import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";

  try {
    const response: any = await verify(header, c.env.JWT_SECRET);
    if (response.id) {
      c.set('userId', response.id);
      await next();
    }
  } catch (e) {
    return c.json({
      error: e
    });
  }
  next();
});

blogRouter.post('/', async (c) => {
  let body = await c.req.json();
  
  let prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Ensure the author exists
  let author = await prisma.user.findUnique({
    where: {
      id: c.get("userId"),
    },
  });

  if (!author) {
    return c.json({ error: "Author not found" }, 404);
  }

  // Create the blog post
  let createdBlog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: author.id, // Use the author ID from the authenticated user
    },
  });

  return c.json({
    createdBlog
  });
});

blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
      author: {
        update: {
          name: body.name
        }
      }
    }
  });
  return c.json({
    id: blog.id
  });
});



blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({
    blogs
  });
});

blogRouter.get('/:id', async (c) => {
  const id =  c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blog = await prisma.post.findFirst({
    where: {
      id: id,
    },
    select : {
      title : true,
      id : true,
      content : true,
      author : {
        select : {
          name : true
        }
      }
    }
  });

  return c.json({
    blog
  });
});
