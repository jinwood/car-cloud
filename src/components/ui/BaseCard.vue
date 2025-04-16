<style lang="css" scoped>
@import '../../assets/base.css';

.card-wrapper {
  display: flex;
  width: 50vw;
  flex-direction: column;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: var(--rounded-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);

  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>

<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>
