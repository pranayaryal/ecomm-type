import * as trpcNext from '@trpc/server/adapters/next'
import { publicProcedure, router } from '@/server/trpc'
import React from 'react'
import { z } from 'zod'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { TRPCError } from '@trpc/server'

export const authorizedProcedure = publicProcedure
    .input(z.object({ name: z.string(), email: z.string(), password_confirmation: z.string() }))
    .use((opts) => {
        if (opts.input.name !== 'Harish') {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: "We don't take kindly to other names",
            });
        }

        return opts.next();
    });

export const loggedProcedure = publicProcedure.use(async (opts) => {
    const start = Date.now();
    const results = await opts.next();

    const durationMs = Date.now() - start;
    const meta = { path: opts.path, type: opts.type, durationMs }

    results.ok
        ? console.log('OK result timing', meta)
        : console.error('Non-OK request timing', meta)

    return results;
})


const loginForTrpc = async ({ email, password }: { email: string, password: string }) => {

    const resp = await axios.post('/login', { email, password })
        .then(res => {
            const { statusText } = res;
            return statusText
        })
        .catch(error => {
            return error.response.data.errors
        })

    return resp;
}

const getUser = async () => {
    const resp = await axios.get('/api/user')
        .then(res => {
            const { statusText } = res;
            return statusText
        })
        .catch(error => {
            console.log('err', error)
            return error.response.data
        })

    return resp;

}




const appRouter = router({
    greeting: publicProcedure
        .input( z.string().nullish())
        .query(({ input }) => {
            return {
                text: `hello ${input ?? 'world'}`
            }
        }),

    login: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string(),
        }))
        .query(async ({ input }) => {
            // const resp = await axios.get("/api/user")
            const email = input.email;
            const password = input.password
            const resp = await loginForTrpc({
                email,
                password,
            })
            // const resp = await getUser()

            console.log(resp)

            return { resp };

        })

});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({})
})
