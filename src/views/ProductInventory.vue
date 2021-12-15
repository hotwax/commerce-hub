<template>
  <ion-page>
    <div class="product">
      <div class="product-image">
        <Image />
      </div>
      <div class="mobileonly">
        <div class="product-detail">
          <div class="product-virtual">
            <ion-item>
              <ion-thumbnail slot="start" class="thumbnail">
                <Image />
              </ion-thumbnail>
              <ion-label>
                <p>Brand</p>
                <h1>Virtual Name</h1>
                <p>{{ $t("Color") }} : color</p>
                <p>{{ $t("Size") }}: size</p>
              </ion-label>
            </ion-item>
          </div>
          <div class="product-tags">
            <ion-chip>
              <ion-icon :icon="pricetag" />
              <ion-label>Shopify ID</ion-label>
            </ion-chip>
          </div>
          <div class="product-metadata">
            <ion-item lines="none" detail>
              <ion-note slot="end" class="metatags">3 variants</ion-note>
            </ion-item>
          </div>
        </div>
        <div class="desktop-only">
          <ion-list>
            <ion-list-header>Variants</ion-list-header>

            <div class="product-detail" v-for="index in 10" :key="index">
              <div class="product-virtual">
                <ion-item lines="none">
                  <ion-label>
                    <ion-label>SKU</ion-label>
                    <p>{{ $t("Color") }} : color</p>
                    <p>{{ $t("Size") }}: size</p>
                  </ion-label>
                </ion-item>
              </div>
              <div class="product-tags">
                <ion-chip>
                  <ion-icon :icon="pricetag" />
                  <ion-label>Shopify ID</ion-label>
                </ion-chip>
              </div>
              <div class="product-metadata">
                <ion-item lines="none" detail>
                  <ion-note slot="end" class="metatags">3 variants</ion-note>
                </ion-item>
              </div>
            </div>
          </ion-list>
        </div>
      </div>
    </div>
  </ion-page>
</template>
<script>
import Image from "../components/Image.vue";

export default {
  name: "ProductInventory",
  components: { Image },

  setup() {
    return {};
  },
};
</script>
<style scoped>
.dis-non {
  display: none;
}
.desktop-only {
  display: none;
}
.product-detail {
  display: grid;
  grid: "virtual tags metadata" / max-content 1fr max-content;
  grid-area: detail;
  border-bottom: 1px solid #92949c;
}
.product {
  display: grid;
  grid: "detail";
  grid-area: product;
}
.product-tags {
  grid-area: tags;
  display: none;
  align-self: center;

  justify-content: center;
}
.product-metadata {
  grid-area: metadata;
  justify-content: center;
}
.product-virtual {
  grid-area: virtual;
}
.product-image {
  grid-area: image;
  display: none;
}

@media (min-width: 900px) {
  .product {
    grid:
      "image detail"
      / 115px auto;
  }
  .desktop-only {
    display: unset;
  }
  .product-tags {
    display: unset;
    display: flex;
  }
  .product-image {
    display: unset;
    height: 180px;
  }

  .thumbnail {
    display: none;
  }
}
</style>