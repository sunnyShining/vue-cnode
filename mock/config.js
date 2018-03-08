module.exports =  function(){
    return [
        // get /topics 主题首页
        {name:'topics', path: '/api/v1/topics'},
        // get /topic/:id 主题详情
        {name:'topic', path: '/api/v1/topic/5a2403226190c8912ebaceeb'},
        // post /topics 新建主题
        {name:'newTopics', path: '/api/v1/topics1'},
        // post /topics/update 编辑主题
        {name:'update', path: '/api/v1/topics/update'},
        // post /topic_collect/collect 收藏主题
        {name:'collect', path: '/api/v1/topic_collect/collect'},
        // post /topic_collect/de_collect 取消主题
        {name:'deCollect', path: '/api/v1/topic_collect/de_collect'},
        // get /topic_collect/:loginname 用户所收藏的主题
        {name:'userCollect', path: '/api/v1/topic_collect/sunnyShining'},
        // post /topic/:topic_id/replies 新建评论
        {name:'replies', path: '/api/v1/topic/5a2403226190c8912ebaceeb/replies'},
        // post /reply/:reply_id/ups 为评论点赞
        {name:'ups', path: '/api/v1/reply/5a2406b48eab6ee92a694627/ups'},
        // get /user/:loginname 用户详情
        {name:'sunnyShining', path: '/api/v1/user/sunnyShining'},
        // post /accesstoken 验证 accessToken 的正确性
        {name:'accesstoken', path: '/api/v1/accesstoken'},
        // get /message/count 获取未读消息数
        {name:'count', path: '/api/v1/message/count'},
        // get /messages 获取已读和未读消息
        {name:'messages', path: '/api/v1/messages'},
        // post /message/mark_all 标记全部已读
        {name:'markAll', path: '/api/v1/message/mark_all'},
    ];
}
