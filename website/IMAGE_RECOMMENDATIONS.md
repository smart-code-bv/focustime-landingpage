# Focustime Landing Page Image Recommendations

This document provides carefully selected Unsplash image recommendations for each section of the Focustime landing page. The selections emphasize Galician landscapes, productive work environments, and the balanced retreat experience.

## Hero Section

### Primary Hero Image
![Galician Coastal Landscape](https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f)
- **URL**: https://unsplash.com/photos/fjNPw1m_lLg
- **Photographer**: Samuel Ferrara
- **Description**: Stunning view of the Galician coastline with dramatic cliffs and blue ocean
- **Why it works**: Captures the natural beauty of Galicia while conveying a sense of expansiveness and freedom

### Alternative Hero Options
![Mountain Retreat](https://images.unsplash.com/photo-1542978709-19c95dc3bc7e)
- **URL**: https://unsplash.com/photos/eUMEWE-7Ewg
- **Photographer**: Roberto Nickson
- **Description**: Tranquil retreat property with mountain view
- **Why it works**: Showcases the type of property retreats might take place in with beautiful surroundings

## Concept Section

### Focused Teamwork
![Team Collaboration](https://images.unsplash.com/photo-1522071820081-009f0129c71c)
- **URL**: https://unsplash.com/photos/QBpZGqEMsKg
- **Photographer**: Annie Spratt
- **Description**: Team engaged in focused collaboration in bright, natural space
- **Why it works**: Illustrates the productive teamwork aspect of the retreats

### Deep Work Environment
![Peaceful Workspace](https://images.unsplash.com/photo-1497215842964-222b430dc094)
- **URL**: https://unsplash.com/photos/BlIhVfXbi9s
- **Photographer**: Kari Shea
- **Description**: Calm, organized workspace with natural light
- **Why it works**: Conveys the "deep work" environment that Focustime creates

## Experience Section

### Culinary Experience
![Galician Cuisine](https://images.unsplash.com/photo-1543362906-acfc16c67564)
- **URL**: https://unsplash.com/photos/mAQZ3X_8_l0
- **Photographer**: Mae Mu
- **Description**: Beautifully presented local cuisine
- **Why it works**: Showcases the culinary aspect of the retreat experience

### Outdoor Activities
![Galician Hiking](https://images.unsplash.com/photo-1551632811-561732d1e306)
- **URL**: https://unsplash.com/photos/psfV7kILR2I
- **Photographer**: Jake Melara
- **Description**: Hiking path through lush green landscape
- **Why it works**: Represents the outdoor activity options available during retreats

### Team Building
![Team Connection](https://images.unsplash.com/photo-1531545514256-b1400bc00f31)
- **URL**: https://unsplash.com/photos/CiC3CQ2x8DI
- **Photographer**: Helena Lopes
- **Description**: Team enjoying conversation in a relaxed setting
- **Why it works**: Captures the team bonding aspect of the retreats

## Location Section

### Rural Villa
![Galician Estate](https://images.unsplash.com/photo-1518156677180-95a2893f3e9f)
- **URL**: https://unsplash.com/photos/jc-JJwHxRWM
- **Photographer**: Vita Marija Murenaite
- **Description**: Traditional stone house with rich green surroundings
- **Why it works**: Representative of the authentic Galician properties used for retreats

### Modern Interior
![Contemporary Workspace](https://images.unsplash.com/photo-1497366754035-f200968a6e72)
- **URL**: https://unsplash.com/photos/9HI8UJMSdZA
- **Photographer**: Daria Shevtsova
- **Description**: Modern, comfortable interior workspace
- **Why it works**: Shows the blend of traditional exteriors with modern, comfortable interiors

### Countryside View
![Galician Countryside](https://images.unsplash.com/photo-1501785888041-af3ef285b470)
- **URL**: https://unsplash.com/photos/KMn4VEeEPR8
- **Photographer**: Pedro Lastra
- **Description**: Lush green countryside with rolling hills
- **Why it works**: Conveys the natural beauty surrounding the retreat properties

## Pazo Image Recommendation

For the "Historic Pazos" section, please download one of these authentic Galician Pazo images:

1. **Pazo de Oca (Galicia)**
   - URL: https://images.unsplash.com/photo-1588516923535-45af20255efc
   - Credit: Adela Crist on Unsplash
   - Description: Beautiful historic stone manor house with gardens

2. **Pazo de Rubianes**
   - URL: https://www.pazoderubianes.com/wp-content/uploads/elementor/thumbs/pazo-rubianes-galicia-1-pnvtbmyxkk3kvxlqlbcu4avs4r7tgfimm5mjfj2v20.jpg
   - Credit: Pazo de Rubianes official website
   - Description: Elegant stone manor with period architecture

3. **Pazo de Mariñán**
   - URL: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pazo_de_Mari%C3%B1%C3%A1n_2.jpg/1200px-Pazo_de_Mari%C3%B1%C3%A1n_2.jpg
   - Credit: Wikimedia Commons
   - Description: Historic Galician manor house with traditional architecture

Each of these options represents an authentic Galician pazo and would be suitable for the "Historic Pazos" section of the website.

## Partners Section

### Property Owner
![Property Professional](https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e)
- **URL**: https://unsplash.com/photos/SJvDxw0azqw
- **Photographer**: Christina @ wocintechchat.com
- **Description**: Professional woman in a thoughtful pose
- **Why it works**: Represents property partners managing retreat locations

### Culinary Partner
![Chef Preparing Food](https://images.unsplash.com/photo-1577219491135-ce391730fb2c)
- **URL**: https://unsplash.com/photos/LOWt1dzMjgQ
- **Photographer**: Louis Hansel
- **Description**: Chef preparing gourmet meal
- **Why it works**: Represents culinary partners who would provide food experiences

### Activities Partner
![Local Guide](https://images.unsplash.com/photo-1530268729831-4b0b9e170218)
- **URL**: https://unsplash.com/photos/-Cmz06-0btw
- **Photographer**: Matheus Ferrero
- **Description**: Friendly guide in outdoor setting
- **Why it works**: Represents local partners who would facilitate activities

## Implementation Instructions

1. **Download Process**:
   - Log in to your Unsplash account
   - Navigate to each image URL
   - Download the premium high-resolution version
   - Save to `/website/images/` directory with descriptive names (e.g., `hero-galician-coast.jpg`)

2. **Image Optimization**:
   - Resize images appropriately:
     - Hero image: 1920px width (maintain aspect ratio)
     - Section images: 800-1200px width
     - Partner images: 400-600px width
   - Compress all images using a tool like ImageOptim
   - Save in WebP format with JPEG fallback for older browsers

3. **HTML Implementation**:
   ```html
   <!-- Example for hero section -->
   <section id="hero" style="background-image: url('images/hero-galician-coast.jpg')">
     <!-- Content here -->
   </section>
   
   <!-- Example for content images -->
   <div class="image-container">
     <img src="images/team-collaboration.jpg" alt="Teams collaborating at Focustime retreat" />
   </div>
   ```

4. **Attribution**:
   - While not required by Unsplash license, consider adding photographer credits in your site footer:
   ```html
   <footer>
     <!-- Other footer content -->
     <div class="photo-credits">
       <small>Photos by Samuel Ferrara, Annie Spratt, Kari Shea and others via Unsplash</small>
     </div>
   </footer>
   ```

5. **Responsive Considerations**:
   - Use the `srcset` attribute for responsive images:
   ```html
   <img src="images/galician-estate-small.jpg" 
        srcset="images/galician-estate-small.jpg 400w,
                images/galician-estate-medium.jpg 800w,
                images/galician-estate-large.jpg 1200w"
        sizes="(max-width: 600px) 400px,
               (max-width: 1200px) 800px,
               1200px"
        alt="Traditional Galician estate" />
   ```

6. **CSS Enhancements**:
   ```css
   .image-container {
     overflow: hidden;
     border-radius: 8px;
     box-shadow: 0 4px 12px rgba(0,0,0,0.1);
   }
   
   .image-container img {
     transition: transform 0.5s ease;
     width: 100%;
     height: auto;
     display: block;
   }
   
   .image-container:hover img {
     transform: scale(1.05);
   }
   ```

These images will dramatically enhance your landing page by showcasing the beauty of Galicia and the productive retreat environment that Focustime offers.
