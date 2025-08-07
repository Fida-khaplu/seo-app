// import { prisma } from '@/lib/prisma'
// import { revalidatePath } from 'next/cache'

// export async function getUsers() {
//   try {
//     const users = await prisma.user.findMany()
//     return { users }
//   } catch (error) {
//     return { error: 'Failed to fetch users' }
//   }
// }

// export async function createUser(formData) {
//   try {
//     const name = formData.get('name')
//     const email = formData.get('email')

//     const user = await prisma.user.create({
//       data: { name, email }
//     })

//     revalidatePath('/')
//     return { user }
//   } catch (error) {
//     return { error: 'Failed to create user' }
//   }
// }

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Fetch all users from the database
 */
export async function getUsers(): Promise<
  | { users: Awaited<ReturnType<typeof prisma.user.findMany>> }
  | { error: string }
> {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error) {
    return { error: 'Failed to fetch users' }
  }
}

/**
 * Create a user using FormData values
 * @param formData - HTML form data containing 'name' and 'email'
 */
export async function createUser(
  formData: FormData
): Promise<
  | { user: Awaited<ReturnType<typeof prisma.user.create>> }
  | { error: string }
> {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    if (!name || !email) {
      return { error: 'Name and email are required' }
    }

    const user = await prisma.user.create({
      data: { name, email },
    })

    revalidatePath('/')
    return { user }
  } catch (error) {
    return { error: 'Failed to create user' }
  }
}
