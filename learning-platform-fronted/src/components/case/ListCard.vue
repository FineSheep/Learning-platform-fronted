<template>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
        <div slot="footer"><b>ant design vue</b> footer part</div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
            <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type">
          <a-icon :type="type" style="margin-right: 8px" />
          {{ text }}
        </span>
            </template>
            <img
                    slot="extra"
                    width="272"
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            <a-list-item-meta :description="item.description">
                <a slot="title" :href="item.href">{{ item.title }}</a>
                <a-avatar slot="avatar" :src="item.avatar"/>
            </a-list-item-meta>
            <div class="box">
                {{ item.content }}
            </div>

        </a-list-item>
    </a-list>
</template>
<script>
    const listData = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'https://www.antdv.com/',
            title: `ant design vue part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好' +
                '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好' +
                '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好' +
                '你好你好你好你好你好你好你好你好你好你好',
        });
    }

    export default {
        name: "ListCard",
        data() {
            return {
                listData,
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                },
                actions: [
                    {type: 'star-o', text: '156'},
                    {type: 'like-o', text: '156'},
                    {type: 'message', text: '2'},
                ],
            };
        },
    };
</script>
<style scoped>
    .box {
        overflow: hidden; /* 隐藏溢出文本 */
        text-overflow: ellipsis; /* 溢出文本省略号显示 */
        word-break: break-all; /* 在恰当的断字点进行自动换行 */
        display: -webkit-box; /* 伸缩盒子 */
        -webkit-box-orient: vertical; /* 伸缩盒子子元素的排列方式 */
        -webkit-line-clamp: 2; /* 显示的行数 */
    }

</style>
