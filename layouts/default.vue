<template>
  <el-container>
    <SidebarLeft class="sidebar_left" />
    <div class="container">
      <Header class="header" />
      <nuxt />
      <Footer class="footer" />
    </div>
    <SidebarRight class="sidebar_right" />
  </el-container>
</template>

<style>

*,
*:before,
*:after {
  margin: 0;
}
html {
  font-family: "Roboto Condensed", "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  background-color: #15151a;
}
.container {
  width: 100%;
  min-height: 100vh;
}
.page {
  padding: 4rem;
}
.card {
  background: #131722;
  border: 0.5px solid #363c4e;
  border-radius: 5px;
}
.el-input__inner {
  background: #353535;
  color: #fafafa;
}
.el-form-item__label {
  color: white !important;
}
.el-dialog .el-form-item__label {
  color: black !important;
}
/*** verify user(assign global) */
.el-textarea__inner {
  height: 50px !important;
  background: #303033;
  color: white;
  padding: 15px 10px;
}
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.4);
}
.el-notification {
  z-index: 99999 !important;
}
/** table */
.el-table{
  background-color: transparent!important;
  color: #fafafa;
}
.el-table th{
  color: #fafafa;
  background: transparent!important;
  /* for header */
}
.el-table__header {
  background: transparent;
}
.el-table .warning-row{
  background-color: transparent!important;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: transparent;
}
.el-table__expanded-cell {
  background: #031626;
}
/** SmartPhone Tablet */
@media only screen and (max-width: 768px) {
  html {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .sidebar_left,
  .sidebar_right {
    display: none;
  }
  .container {
    flex: 1;
  } /* make footer stick in the bottom */
  .page {
    padding: 1rem;
    padding-top: 6rem;
    /* make footer stick to the bottom */
    flex-direction: column;
    min-height: 100vh;
  }
  .el-message-box {
    width: auto;
  }
}
/* Normal */
@media only screen and (min-width: 769px) and (max-width: 1199px) {
  .header,
  .footer {
    display: none;
  }
}
/* Large monitor */
@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .header,
  .footer {
    display: none;
  }
}
/* Landscape */
@media only screen and (max-height: 500px) {
}
/* Widescreen */
@media only screen and (min-width: 1920px) {
  .header,
  .footer {
    display: none;
  }
}
</style>

<script>
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  components: {
    SidebarLeft,
    SidebarRight,
    Header,
    Footer
  }
};
</script>

