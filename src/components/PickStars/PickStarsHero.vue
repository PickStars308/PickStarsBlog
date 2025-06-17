<template>
  <section class="hero">
    <div class="hero-container">
      <!-- 左侧内容区 -->
      <div class="hero-text">
        <span class="title wow animate__animated animate__fadeInLeft">
          Hi! <strong class="wow animate__animated animate__fadeInRight"> 🖐️</strong>
        </span>

        <span class="subtitle wow animate__animated animate__fadeInLeft" data-wow-delay="0.3s">
          这里是 <span class="sitename wow animate__animated animate__fadeInLeft">{{ SiteAuthor }}</span> 的小窝
        </span>
        <span class="slogan wow animate__animated animate__fadeInLeft" data-wow-delay="0.5s">
          一款Material Design 3为风格设计的多功能工具聚合工具箱
        </span>
      </div>

      <!-- 右侧头像区 -->
      <div class="hero-avatar wow animate__animated animate__fadeInRight">
        <img :src="AvatarUrl" :alt="SiteAuthor"/>
      </div>
    </div>

    <div class="scroll-down">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">

const AvatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=${import.meta.env.VITE_AVATAR_SIZE}&img_type=jpg`
const SiteAuthor = import.meta.env.VITE_SITE_AUTHOR
</script>

<style lang="scss" scoped>
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;


  .scroll-down {
    position: absolute;
    bottom: 5rem;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    font-size: 1rem;
    animation: slide-down 2s infinite;
  }

  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
  }
  .hero-container {
    display: grid;
    grid-template-columns: 13fr 2fr;
    gap: 2rem;
    align-items: center;
    width: 100%;
    max-width: 1200px;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column-reverse;
      text-align: center;
    }

    .hero-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;

      .title {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .subtitle {
        font-size: 2.6rem;
        margin-bottom: 1.5rem;

        .sitename {
          color: var(--el-color-primary);
          font-weight: 700;
        }

      }

      .slogan {
        font-size: 1.5rem;
        margin-bottom: 2rem;
      }

      @media (max-width: 768px) {
        .title {
          font-size: 2.5rem;
        }

        .subtitle {
          font-size: 1.2rem;
        }

        .slogan {
          font-size: 1rem;
        }
      }
    }

    .hero-avatar {
      text-align: center;

      img {
        width: 260px;
        height: 260px;
        border-radius: 10%;
        object-fit: cover;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      @media (max-width: 768px) {
        img {
          width: 100px;
          height: 100px;
          border-radius: 10%;
          object-fit: cover;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
      }
    }
  }
}

</style>
