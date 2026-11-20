import { createSearchParams, useLoaderData, type LoaderFunctionArgs } from "react-router";
import ListComponent from "../../components/products/listComponent";
import jwtAxios from "../../util/jwtUtil";

export async function loadProducts({request}: LoaderFunctionArgs) {

    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1'
    const size = url.searchParams.get('size') || '10'

    const queryStr = createSearchParams({page,size}).toString()

    const res = await jwtAxios.get(`http://localhost:8080/api/products/list?${queryStr}`)

    return res.data
}

const ListPage = () => {

    const pageResponse = useLoaderData();

    console.log(pageResponse)

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-2xl m-4 font-extrabold">
                Products List Page
            </div>
            <ListComponent serverData={pageResponse}></ListComponent>
        </div>
    );
}

export default ListPage;