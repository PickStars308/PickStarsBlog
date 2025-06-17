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
          <Typewriter/>
        </span>

        <div class="social-links wow animate__animated animate__fadeInUp" data-wow-delay="0.7s">
          <SocialLinks/>
        </div>
      </div>

      <!-- 右侧头像区 -->
      <div class="hero-avatar wow animate__animated animate__fadeInRight">
        <img :src="AvatarUrl" :alt="SiteAuthor"/>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import SocialLinks from "@/components/Layout/SocialLinks.vue";
import Typewriter from "@/components/Typewriter.vue";

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

      .social-links {
        display: flex;
        gap: 1rem;

        a {
          font-size: 1.5rem;
          color: #333;
          transition: color 0.3s;

          &:hover {
            color: var(--el-color-primary);
          }
        }

        @media (max-width: 768px) {
          justify-content: center;
        }
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
