<script setup>
import GenderSideBar from "../../components/organisms/gender/sidebar.vue";
import GenderHeader from "../../components/organisms/gender/header.vue";

const menuItems = [
  {
    label: "What is New",
    path: "men-new",
  },
  {
    label: "Bestsellers",
    path: "men-best-sellers",
  },
  {
    label: "Pants",
    path: "men-pants",
  },
  {
    label: "Hoodies",
    path: "men-hoodies",
  },
  {
    label: "Jackets",
    path: "men-jackets",
  },
  {
    label: "Shorts",
    path: "men-shorts",
  },
  {
    label: "Accessories",
    path: "men-accessories",
  },
];
</script>

<template>
  <div>
    <div class="flex flex-row gap-2 items-start">
      <div class="p-8">
        <GenderSideBar header="lalalemon men's" :menu-items="menuItems" />
      </div>
      <GenderHeader
        image-path="/6.webp"
        image-alt-description=""
        upper-button-label="Shop whats's new"
        upper-button-path="men-new"
        lower-button-label="Shop winter whites for him"
        lower-button-path="men-new"
        footer-description="Blanket them in the crisp warmth of the new Winter Whites Collection."
      />
    </div>
    <div class="py-20">
      <UContainer class="flex flex-col md:grid grid-cols-2 gap-4">
        <OrganismsHeroCard
          image-path="/7.webp"
          title="Make your power move."
          description="Tops with Silverescent™ technology you can layer effortlessly for peak-level comfort all day long."
          button-route-path="/men/tops"
          button-text="SHOP TOPS"
        />
        <OrganismsHeroCard
          image-path="/8.webp"
          title="One oversized fit. 365 chances to wear it."
          description="Days in and days out—you'll reach for the easygoing Steady State Collection."
          button-route-path="/men/hoodies"
          button-text="SHOP HOODIES"
        />
        <OrganismsHeroCard
          image-path="/9.webp"
          title="Sharp look, soft feel."
          description="Cut a dashing figure in stylish jackets versatile enough for new adventures."
          button-route-path="/men/jackets"
          button-text="SHOP JACKETS"
        />
        <OrganismsHeroCard
          image-path="/10.webp"
          title="Classic example of innovation."
          description="The ABC Classic-Fit Trouser in Warpstreme™ fabric moves like other trousers don't. That's ABC™ technology."
          button-route-path="/men/pants"
          button-text="SHOP PANTS"
        />
      </UContainer>
    </div>
  </div>
</template>
