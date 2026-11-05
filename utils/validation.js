export const validateMenuItem = (
  name,
  description,
  price
) => {

  if (!name.trim()) {
    return "Name is required";
  }

  if (!description.trim()) {
    return "Description is required";
  }

  if (!price.trim()) {
    return "Price is required";
  }

  if (isNaN(price)) {
    return "Price must be numeric";
  }

  return "";
};