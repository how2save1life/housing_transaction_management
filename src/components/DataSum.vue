<template>
  <div class="DataSum" style="margin: auto;">
    <h4 style="text-align: center;color:black;">系统交易信息一览</h4>
    <div style="text-align: center" align="center">
      <el-table
        :data="tableData"
        height="100"
        border
        style="width: 100%">
        <el-table-column
          prop="0"
          label="房屋总数"
        >
        </el-table-column>
        <el-table-column
          prop="1"
          label="已成交房屋数"
        >
        </el-table-column>
        <el-table-column
          prop="2"
          label="交易中房屋数">
        </el-table-column>
        <el-table-column
          prop="3"
          label="余下房屋数">
        </el-table-column>
      </el-table>
      <br>

    </div>

    <br>
    <el-row>
      <div class="mypie" style="height: 300px">
        <schart :canvasId="canvasId"
                :type="type"
                :width="width"
                :height="height"
                :data="mydata"
                :options="options1"
                style="height: 100%;"
        ></schart><!---->
      </div>
    </el-row>
    <br>
    <el-row>
      <div class="mypie" style="height: 300px">
        <schart canvasId="canvasId"
                type="bar"
                :width="width"
                :height="height"
                :data="layoutdata"
                :options="options2"
                style="height: 100%;"
        ></schart><!---->
      </div>
    </el-row>
  </div>
</template>


<script>
  import Schart from 'vue-schart';

  export default {
    name: "DataSum",
    data() {
      return {
        tableData: [],
        price: [{
          average: '1000',
          min: '20',
          max: '10000'
        },
        ],

        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },

        canvasId: 'myCanvas',
        type: 'pie',
        width: 600,
        height: 900,
        mydata: [],
        layoutdata:[],
        options1: {
          title: '成交情况统计图',
          bgColor: '#c4c6ca',
          titleColor: '#406b91',
          legendColor: '#000000',
          legendTop: 100,
          radius: 100,                    // 饼图半径
          axisColor: '#020202',
          yEqual: 5,
        },
        options2: {
          title: '户型统计图',
          bgColor: '#c4c6ca',
          titleColor: '#406b91',
          legendColor: '#000000',
          legendTop: 100,
          radius: 100,                    // 饼图半径
          axisColor: '#020202',
          yEqual: 5,
        }


      }
    },
    methods: {
      /*this.$axois*/
    },


    mounted() {
      //返回housedata
      this.$axios.get("http://localhost:8080/House/houseData").then(response => {
        console.log(response);
        console.log(response.data);
        let houseData = response.data.split(",")
        this.tableData.push(houseData);//tableData[0]:sum tableData[1]:sold tableData[2]:onsale
        /*this.mydata.push({name: '房屋总量', value: parseInt(houseData[0])})*/
        this.mydata.push({name: '已成交', value: parseInt(houseData[1])})
        this.mydata.push({name: '交易中', value: parseInt(houseData[2])})
        this.mydata.push({name: '剩余房屋', value: parseInt(houseData[3])})
        console.log(this.tableData);
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })

      this.$axios.get("http://localhost:8080/House/houseLayoutData").then(response => {
        console.log(response);
        console.log(response.data);
        let houseData = response.data.split(",")

        this.layoutdata.push({name: '一室', value: parseInt(houseData[0])})
        this.layoutdata.push({name: '二室', value: parseInt(houseData[1])})
        this.layoutdata.push({name: '三室', value: parseInt(houseData[2])})
        this.layoutdata.push({name: '四室', value: parseInt(houseData[3])})
        this.layoutdata.push({name: '五室', value: parseInt(houseData[4])})
        this.layoutdata.push({name: '五室以上', value: parseInt(houseData[5])})
        console.log(this.layoutdata);
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })

    },
    methods: {},
    components: {
      Schart
    }


  }
</script>

<style>

</style>
