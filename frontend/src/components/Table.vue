<template>
  <div class="filter">
    <div v-for="(value, name) in header" class="filterItem" :style="styleFilter(value.width)">
      <input v-if="!value?.noFilter" type="text" :placeholder="value.label" v-model="filter[name]" />
    </div>
  </div>
  <table>
    <tr>
      <th v-for="value in header">
        {{value.label}}
      </th>
    </tr>
    <tr v-for="row in filterData" v-on:click="onClick(row._id, $event)">
      <td v-for="(value, name) in header" :style="styleColumn(value.width, value.align)">
        <template v-if="value.type == 'check'">
          {{(row[name] ? "Áno" : "Nie")}}
        </template>
        <template v-if="value.type == 'date'">
          <input type="date" v-model="row[name]">
        </template>
        <template v-if="!value.type">
          {{row[name]}}
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: Array,
    header: Object,
    onClick: Function,
  },
  data() {
    return {
      filter: {},
    }
  },
  computed: {
    filterData() {
      let result = this.data
      for (name in this.filter) {
        if (this.filter[name]) {
          result = result.filter(obj => obj[name].toLowerCase().includes(this.filter[name].toLowerCase()))
        }
      }
      return result
    }
  },
  methods: {
    styleFilter(value) {
      let style = {
        width: "calc("+ value + "% - 20px)"
      }
      return style
    },
    styleColumn(width, align) {
      let style = {
        'width': width + "%",
        'text-align': align,
      }
      return style
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
}

.filterItem {
  margin: 0 10px;
  overflow: hidden;
}

.filterItem input {
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(20, 165, 223);
    margin-bottom: 10px;
  }

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid rgb(212, 212, 212);
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  color: rgb(20, 165, 223);
}

tr:hover {
  background-color: #C4E4F2;
  cursor: pointer;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: rgb(20, 165, 223);
  color: white;
  cursor: default;
}

td input {
  width: 100%;
}

</style>