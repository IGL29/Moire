<script>
export default {
  methods: {
    currentImage() {
      let pictureByColor = null;
      const colorItem = this.product.colors.find((color) => (
        Number(color.color.id) === Number(this.selectedColorId)
      ));
      if (colorItem.gallery?.[0]?.file?.url) {
        pictureByColor = colorItem.gallery[0].file.url;
      } else {
        pictureByColor = 'img/no_image.png';
      }
      return pictureByColor;
    },
  },
};
</script>
