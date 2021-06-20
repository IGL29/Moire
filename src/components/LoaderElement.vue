<template>
  <div class="circles">
    <div class="large-circle"></div>
    <div class="mid-circle"></div>
    <div class="small-circle"></div>
  </div>
</template>

<script>
export default {
  name: 'LoaderElement',
};
</script>

<style>
.circles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
}
.circles div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  transform-origin: top left;
}
.large-circle {
  background: #f03e3e;
  width: 150px;
  height: 150px;
  animation: grow cubic-bezier(0.785, 0.135, 0.15, 0.86) 3s infinite;
}
.mid-circle {
  background: #7950f2;
  width: 100px;
  height: 100px;
  animation: grow cubic-bezier(0.785, 0.135, 0.15, 0.86) 3s infinite 0.5s;
}
.small-circle {
  background: #fff;
  width: 50px;
  height: 50px;
  animation: grow cubic-bezier(0.785, 0.135, 0.15, 0.86) 3s infinite 0.8s;
}
@-moz-keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
@-webkit-keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
@-o-keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
@keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
</style>
