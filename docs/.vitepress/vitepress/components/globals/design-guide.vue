<template>
  <div class="guide-design">
    <div class="elp-row cards" style="margin-left: -7px; margin-right: -7px">
      <div class="elp-col elp-col-24 elp-col-xs-12 elp-col-sm-6 is-guttered">
        <div class="card">
          <consistency-svg m="4" w="20" alt="Consistency" />
          <p>Consistency</p>
        </div>
      </div>
      <div class="elp-col elp-col-24 elp-col-xs-12 elp-col-sm-6 is-guttered">
        <div class="card">
          <feedback-svg m="4" w="20" alt="Feedback" />
          <p>Feedback</p>
        </div>
      </div>
      <div class="elp-col elp-col-24 elp-col-xs-12 elp-col-sm-6 is-guttered">
        <div class="card">
          <efficiency-svg m="4" w="20" alt="Efficiency" />
          <p>Efficiency</p>
        </div>
      </div>
      <div class="elp-col elp-col-24 elp-col-xs-12 elp-col-sm-6 is-guttered">
        <div class="card">
          <controllability-svg m="4" w="20" alt="Controllability" />
          <p>Controllability</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.elp-col {
  padding: 0 7px;
}
.card {
  background: var(--elp-fill-color-lighter);
  height: 204px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin: 1rem;
    width: 5rem;
    height: 5rem;
  }
}

@media screen and (max-width: 767px) {
  .elp-col {
    padding-bottom: 8px;
  }
}
</style>
