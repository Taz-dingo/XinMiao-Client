declare namespace API {
    type Response<T> = {
        code: number
        msg: string
        data: T
    }


    // forumService ---------------------------
    type postDetailParams = {
        postid: string
    }

    type getPostCommentParams = {
        postid: string
        time_order: string
        like_order: string
    }

    type postTaskParams = {
        creator: string
        title: string
        contain: string
        ctime: string
        taskid: string
    }

    type postNormalParams = {
        creator: string
        title: string
        contain: string
        ctime: string
    }

    type deletePostParams = {
        postid: string
    }

    type getUserPostsParams = {
        // userid: string 
    }

    type getUserCollectPostsParams = {
        // userid: string
    }

    type likePostParams = {
        postid: string
    }

    type collectPostParams = {
        // userid: string
        postid: string
    }

    type searchPostParams = {
        keyword: string
    }

    type editPostParams = {
        postid: string
        title: string
        contain: string
    }

    type postCommentParams = {
        fa_post: number // 父帖子ID
        fa_comment: number | null  // 父评论ID
        // creator: number // 评论者ID
        is_facomment: number // 是否父评论
        reply: string    // 发帖人ID
        contain: string  // 评论内容
    }

    // mapService ----------------------------
    type getPathPlaningProps = {
        origin: string
        destination: string
    };


    // userService ---------------------------
    type getBagInfoParams = {
        // userid: string 
    }

    type LoginData = {
        id: string;
        pwd: string;
    }

    type sendMsgData = {
        tel: string
    }

    interface msgLoginData {
        tel: string,
        code: string
    }

    // taskService ---------------------------
    type getTaskSetsParams = {
        // userid: number
        is_mainline: string
        is_now: string
    }
    type getTaskSetsResult = {
        name: string
        applicant: string
        ctime: string
        etime: string
        isSetDue: string
        isMainline: string
        setId: string
    }[]

    type getTasksParams = {
        setid: string
        is_now: string
        // userid: string
    }

    type getTaskDetailParams = {
        taskid: string
    }

    type getTaskDetailResult = {
        id: number
        title: string
        demand: string
        ctime: string
        btime: string
        dtime: string
        type: string
        location: string
        lngLat: string
        name: string
        img: string
        examplePic: string | null
        isAI: string | null
        isfinish: string | null
        isMainline: number
        setId: number
    }

    type getTaskCoordsParams = {
        userid: string
    }

    type confirmAnnData = {
        // userid: string,
        taskid: string,
        time: string
    }
    type confirmAnnResult = {}

    type sendLocInData = {
        // userid: string,
        taskid: string,
    }
    type sendLocInResult = {}

    type sendLocOutData = {
        // userid: string,
        taskid: string,
    }
    type sendLocOutResult = {}
}