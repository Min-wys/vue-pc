<template>
  <div class="pagination">
    <!-- 点击上一页，myCurrentPage要变化，参数是当前页码-1 -->
    <button
      @click="setCurrentPage(myCurrentPage - 1)"
      :disabled="myCurrentPage <= 1"
    >
      上一页
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="setCurrentPage(1)">
      1
    </button>
    <!-- 开头的三点按钮 当star大于2时就显示-->
    <button v-show="startEnd.start > 2">...</button>
    <!-- 中间按钮进行遍历展示 -->
    <!-- 按钮要能够点击，修改当前页码 -->
    <button
      v-for="item in mapBtnsNum"
      :key="item"
      @click="setCurrentPage(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      {{ startEnd.start + item - 1 }}
    </button>
    <!-- 结尾的三点按钮 当end小于总也数-1时就显示-->
    <button v-show="startEnd.end < totalPages - 1">...</button>
    <button
      :class="{ active: myCurrentPage === totalPages }"
      @click="setCurrentPage(totalPages)"
      v-show="totalPages > 1"
    >
      {{ totalPages }}
    </button>
    <button
      @click="setCurrentPage(myCurrentPage + 1)"
      :disabled="myCurrentPage >= totalPages"
    >
      下一页
    </button>
    <button>总数：{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 显示按钮的数量
    pagerCount: {
      type: Number,
      // 验证
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总数
    total: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  data() {
    return {
      // props数据不能修改，只读
      myCurrentPage: this.currentPage,
    };
  },
  watch: {
    myCurrentPage(currentPage) {
      this.$emit("current-change", currentPage);
    },
    currentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
  computed: {
    // 计算总页数  总数据（total）  /  每页条数（pageSize）
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算中间按钮的开头和结束的按钮值
    startEnd() {
      // 收集所有参与计算的参数
      const { myCurrentPage, pagerCount, totalPages } = this;
      // 中间有多少个按钮
      let count = pagerCount - 2;
      // 计算中间的中间值
      const halfCount = Math.floor(count / 2);

      let start;
      let end;

      // 1 [2] 3 4 5 6 ...10
      // 1...3 4 [5] 6 7...10
      // 1 ... 5 6 7 8 [9] 10
      // 1 [2] 3
      // [1] --> 如果start大于总页数，不显示

      // 1 ... 5 6 7 8 [9] 10  当 当前页是中间的中间的后面totalPages - halfCount = 8
      if (myCurrentPage >= totalPages - halfCount) {
        start = totalPages - count;
      } else {
        // 当 当前页码是在中间时
        start = myCurrentPage - halfCount;
      }

      // 当前页是中间按钮的前面的2时，start计算出来的是就是0，3--->1 不能是0，改为2
      // if (start <= 1) {
      //   start = 2;
      // }
      if (myCurrentPage <= 1 + halfCount) {
        start = 2;
      }

      // start + 5 - 1 end根据start计算
      end = start + count - 1;

      if (end >= totalPages) {
        // 1 [2] 3
        end = totalPages - 1;
      }
      return {
        start,
        end,
      };
    },
    // 要遍历的数量
    mapBtnsNum() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  methods: {
    // 修改当前页的方法
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>
