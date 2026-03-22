# Integrate Project Images into Showcase

Add visual context to the project deep-dives by including screenshots for ShopSphere, SmartXML, and HPE IT Solutions.

## Proposed Changes

### Projects Component
#### [MODIFY] [Projects.jsx](file:///c:/Users/imvis/Desktop/React%20Projects/portfolio/src/pages/Projects.jsx)
- Update `projectsData` to include an `image` property for the following projects:
    - **ShopSphere**: `/assets/images/shopsphere.png`
    - **SmartXML Solutions**: `/assets/images/smartxml.png`
    - **HPE IT Solutions**: `/assets/images/hpeitsolutions.png`
- In the `Projects` component modal (within `AnimatePresence`), insert a `motion.div` containing the project image if available.
- Style the image container with a themed border, rounded corners, and a subtle glow.

## Verification Plan

### Manual Verification
1. Navigate to the **Projects** page.
2. Click on the three projects and verify the screenshot appears in each modal.
3. Check for responsiveness on mobile and tablet views.
