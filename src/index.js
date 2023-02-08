// write your code here
fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramen => {
        for (dish in ramen) {
            renderDish(ramen[dish]);
        }
        renderDetail(ramen[0]);
    });


function renderDish(dish) {
    let core = document.querySelector('#ramen-menu');
    img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;
    img.addEventListener('click', e => {
        renderDetail(dish);
    })
    core.append(img);
}

function renderDetail(dish) {
    console.log(dish);
    let detail = document.querySelector('#ramen-detail');
    let imgLoc = detail.querySelector('.detail-image');
    let nameLoc = detail.querySelector('.name');
    let restaurantLoc = detail.querySelector('.restaurant');
    let ratingLoc = document.querySelector('#rating-display');
    let commentLoc = document.querySelector('#comment-display');

    imgLoc.src = dish.image;
    imgLoc.alt = dish.name;

    nameLoc.textContent = dish.name;
    restaurantLoc.textContent = dish.restaurant;
    ratingLoc.textContent = dish.rating;
    commentLoc.textContent = dish.comment;
}

let form = document.querySelector('#new-ramen');
form.addEventListener('submit', e => {
    e.preventDefault();
    let comment = 'x';
    let newDish = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: form.querySelector('#new-comment').value
    };

    fetch('http://localhost:3000/ramens/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDish)
    })
        .then(r => r.json())
        .then(r => {
            renderDish(newDish);
            e.target.reset();
        });
})