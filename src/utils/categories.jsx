const CATE = {
    categories: {
        parentCode: "01",
        data: [
            {
                name: "전체",
                id: "search_cat_all",
                code: "00"
            },
            {
                name: "생활/주방/가구/건강",
                id: "search_cat_health",
                code: "01"
            },
            {
                name: "가전/IT",
                id: "search_cat_it",
                code: "02"
            },
            {
                name: "의류/잡화",
                id: "search_cat_clothes",
                code: "03"
            },
            {
                name: "스포츠/레저/자동차",
                id: "search_cat_sports",
                code: "04"
            },
            {
                name: "화장품/미용",
                id: "search_cat_beauty",
                code: "05"
            },
            {
                name: "유아동/도서/문구",
                id: "search_cat_kids",
                code: "06"
            },
            {
                name: "식품",
                id: "search_cat_food",
                code: "07"
            },
            {
                name: "청소/생활용품",
                id: "search_cat_life",
                code: "08"
            },
            {
                name: "기타",
                id: "search_cat_etc",
                code: "09"
            }
        ]
    },
    regions: {
        parentCode: "02", 
        data: [
            {
                name: "전체",
                id: "search_region_all",
                code: "00"
            },
            {
                name: "명동",
                id: "search_region_myungdong",
                code: "01"
            },
            {
                name: "강남",
                id: "search_region_gangnam",
                code: "02"
            },
            {
                name: "성수",
                id: "search_region_sungsoo",
                code: "03"
            },
            {
                name: "김포",
                id: "search_region_kimpo",
                code: "04"
            },
        ]
    },
    status: {
        parentCode: "03",
        data: [
            {
                name: "전체",
                id: "search_status_all",
                code: "00"
            },
            {
                name: "중고상품",
                id: "search_status_old",
                code: "01"
            },
            {
                name: "새 상품",
                id: "search_status_new",
                code: "02"
            },
        ]
    }
}

const getCateName = (code) => {
    for (const cate of CATE.categories.data) {
        if (cate.code === code) return cate.name;
    }
    return null;
}

export {CATE, getCateName};