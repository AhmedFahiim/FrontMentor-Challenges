// function to remove any active class and add it to the current target

function removeActive(list) {
  list.forEach((item) => {
    item.classList.remove("active");
  });
}

// fetch json file

export default async function fetchApi() {
  let fetchData = (await fetch("../data.json")).json();
  return fetchData;
}

// exported functions
export { removeActive };
