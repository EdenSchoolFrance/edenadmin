import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
    const header = new Headers();
    header.append("Authorization", `Bearer ${process.env.STRAPI_TOKEN}`)
   const rep = await fetch(`${process.env.STRAPI_URL}/api/stories/${params.id}`, { headers : header})
    const data = await rep.json()

    return json({ id: params.id, rep: data });
};

export const DetailPost = () => {
    const { id, rep } = useLoaderData<typeof loader>();
    console.log(rep);
    
    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default DetailPost