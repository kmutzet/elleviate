# ELLEviate Functional Requirements

## (G) General
```
G1. The website must be accessibly readable and navigable by a screen-reader *
G2. When a user closes the website, all user-inputted data must be deleted and the system reset to its default state *

*Non-Functional Requirements
```

## (N) Navigation Bar
```s
N1. When a user enters the website, it will contain the following
- N1a. Brand logo, page names (‘Find a Doctor’ and ‘About Us’)

N2. When a user clicks on the brand logo, they will be directed to the website’s home/landing page

N3. When a user clicks on ‘Find a Doctor’, they will be directed to the Interactive Map Page

N4. When a user clicks on ‘About Us’, they will be directed to the About Us page
```


## (H) Home Page

### H1. Search Tool

```
H1a. The page must allow users to manually input their location (state, city, or zip code) into the search tool.

H1b. When a user clicks on the “Search by Insurance”, a drop down list will appear with a list of insurance plans to select from

H1c. The website must direct the user to the interactive map page when the ‘Search’ button is pressed, using the provided location and insurance information.

H1d. The page must display an error message if the user inputs an invalid location.
```

### H2. Resources

```
H2a. The page must display links to external resources (e.g., Scarleteen and Planned Parenthood) for user access.

H2b. When a user clicks on any link to an external resource, the link will open the URL page on a new tab
```

## (A) About Us Page

```
A1. This page contains the following:
    A1a. A picture of the website’s team members, the team members’ names, and a short biography of the team members
    A1b. Website overview and mission statement 
    A1c. Contact information of the team including a phone number and email
```

## (M) Interactive Map 

### M1. Map
```
M1a. After users make a valid search, the map contains:
    M1aa. Base map centered on the city containing the address searched
    M1ab. Pins on the locations of Ob/Gyns who accept the insurance searched

M1b. When the user drags the map image, the base map shifts according to the user’s cursor
```

### M2. Sidebar
```
M2a. After users make a valid search, the sidebar contains:
    M2aa. “Ob/Gyn near you” title
    M2ab. Subtitle reporting number of Ob/Gyns found in the city containing the address searched
    M2ac. List of Ob/Gyns in the city containing the address searched who accept the insurance searched.

M2b. If users click on a pin on the map, the Ob/Gyn represented appears as the top of the list in the sidebar
```

### M3. Ob/Gyn List

```
M3a. Each item on the list of Ob/Gyns contains:
    M3aa. “Doctor” followed by the Ob/Gyn’s full name
    M3ab. Occupation
    M3ac. Name of workplace
    M3ad. Address of workplace
    M3ae. List of insurances accepted
    M3af. Work phone number
    M3ag. Distance in miles from address searched
    M3ah. "Learn More" button linked to the Doctor’s page
 ```

### M4. Filters

```
M4a. When users make a valid search, map filters include:
    M4aa. Drop-down insurance filter of all insurances available in the United States. When insurance is selected, all locations displayed will only match the specific insurance filter
    M4ab. Manual-input location filter that will change the location shown on the map
    M4ac. Drop-down distance filter for 1 mile, 5 miles, 10 miles, and 50+ miles. When one distance filter is selected, the map will expand or contrast to show the available locations in that area

M4b. If users enter an invalid address in the manual-input location filter, an error message stating “Please enter a valid location” will appear
```

## (D). Doctor’s Page
```
D. When a user enters the Doctor’s page, it will contain the following
    Da. Information about qualifications
    Db. Review section from previous patients
```

### D1. About Doctor
```
D1a. All insurances accepted by the doctor will be displayed with a checkmark icon
D1b. Information such as name, specialty, phone number, and address will be displayed here
```

### D2. Information
```
D2a. If a doctor does not have all of the information provided for “Qualifications”, the body text will display “No information provided” below the title
```

### D3. Reviews
```
D3a. The reviews will be listed by Highest Reviews by default

D3b. When a user clicks on the “Sort by” button in the Review section, a drop-down will appear containing the following options:
    D3aa. Most Recent
    D3ab. Highest Reviews

D3c. When a user clicks on “Read More” in the review section, the user will be redirected to the respective Yelp page of the doctor

D3d. If a doctor does not have any reviews, the review section will
    D3da. Be empty 
    D3db. Have “No reviews given” displayed in the center
```
