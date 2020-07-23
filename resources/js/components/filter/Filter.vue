<template>
  <div>
    <SubMenuFilter />
    <FilterSelect></FilterSelect> 
    <FilterShow></FilterShow> 

  </div>
</template>

<script>


import SubMenuFilter from "./SubMenuFilter";
import FilterSelect from "./FilterSelect";
import FilterShow from "./FilterShow";


export default {
  components: { SubMenuFilter, FilterSelect, FilterShow },
}
</script>

<style scoped>
</style>
