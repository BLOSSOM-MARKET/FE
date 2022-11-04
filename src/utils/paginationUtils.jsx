import { createQueryObj } from "./searchutils";

    const onClickPageBtn = (e, path, searchParams) => {
        console.log("page:", e.target.value);
        const queryList = [...searchParams];
        const q = createQueryObj(queryList);
    }