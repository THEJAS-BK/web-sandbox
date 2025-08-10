const addPost = document.querySelector(".add");
console.log(addPost);
addPost.addEventListener("click", () => {
  console.log("yes");
  window.location.href = "http://localhost:4040/posts/add";
});
