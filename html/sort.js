document.addEventListener("DOMContentLoaded", function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sortBy = e.target.textContent.trim();
            
            if (sortBy === 'Highest Rated') {
                sortByHighestRated();
            } else if (sortBy === 'Most Recent') {
                sortByMostRecent();
            }
        });
    });

    function sortByHighestRated() {
        const reviewsContainer = document.querySelector('.reviews-container');
        const reviews = Array.from(reviewsContainer.querySelectorAll('.review'));
        reviews.sort((a, b) => {
            const ratingA = parseInt(a.dataset.rating);
            const ratingB = parseInt(b.dataset.rating);
            return ratingB - ratingA; // Sort descending (highest to lowest)
        });
        
        // Clears current reviews
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => reviewsContainer.appendChild(review));
    }

    function sortByMostRecent() {
        const reviewsContainer = document.querySelector('.reviews-container');
        const reviews = Array.from(reviewsContainer.querySelectorAll('.review'));
        reviews.sort((a, b) => {
            const dateA = new Date(getDateFromText(a.querySelector('.text-muted').textContent));
            const dateB = new Date(getDateFromText(b.querySelector('.text-muted').textContent));
            return dateB - dateA; // Sort descending (most recent to oldest)
        });
        
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => reviewsContainer.appendChild(review));
    }

    function getDateFromText(dateText) {
        // Extracts and parses the date from text format to something like "12/02/2023"
        const parts = dateText.split(' | ')[0].split('/');
        const month = parseInt(parts[0]) - 1; // Month is zero-indexed in Date constructor
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        return new Date(year, month, day);
    }
});
