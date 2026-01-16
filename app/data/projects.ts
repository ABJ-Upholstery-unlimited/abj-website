export interface ProjectImage {
    src: string;
    caption?: string;
}

export interface Project {
    id: string;
    title: string;
    location: string;
    category: "transformations" | "commercial" | "antique" | "residential";
    description: string;
    // The User's requested standard asset groups:
    images: {
        hero: string;       // The main image shown in the grid (High Res 'After')
        before?: string[];  // Array of "Before" state images
        process?: string[]; // "Work in progress" shots
        madeHere?: string[]; // "Made here" / Workshop shots
        after?: string[];   // Additional "After" angles
    };
}

export const PROJECTS: Project[] = [
    {
        id: "p1",
        title: "Black Leather Tufted Wingback",
        location: "McLean, VA",
        category: "transformations",
        description: "A complete restoration of a vintage wingback chair. We stripped it to the frame, repaired the loose joinery, and reupholstered it in a premium Italian black leather with deep diamond tufting.",
        images: {
            hero: "/assets/portfolio/Project_01/After/hero.jpg",
            before: [
                // You can add multiple images here, separated by commas
                "/assets/portfolio/Project_01/Before/Before_01.jpg",
                "/assets/portfolio/Project_01/Before/Before_02.jpg"
            ],
            process: [],
            madeHere: [],
            after: [
                "/assets/portfolio/Project_01/After/hero.jpg",
                "/assets/portfolio/Project_01/After/After_01.jpg",
                "/assets/portfolio/Project_01/After/After_02.jpg",
                "/assets/portfolio/Project_01/After/After_03.jpg",
                "/assets/portfolio/Project_01/After/After_04.jpg",
                "/assets/portfolio/Project_01/After/After_05.jpg"
                // "/assets/portfolio/Project_01/After/detail-shot.jpg"
            ]
        }
    },
    {
        id: "p2",
        title: "Rococo Revival Suite",
        location: "Great Falls, VA",
        category: "antique",
        description: "A breathtaking restoration of a 19th-century Rococo Revival living suite. The ornate frames were meticulously ebonized to a high-gloss black finish, creating a dramatic contrast with the crisp, Belgian white linen upholstery. The sofa features traditional deep-button diamond tufting, honoring the piece's historical grandeur while fitting perfectly into a modern formal living space.",
        images: {
            hero: "/assets/portfolio/Project_02/After/hero.jpg",
            before: ["/assets/portfolio/Project_02/Before/Before_01.jpg", "/assets/portfolio/Project_02/Before/Before_02.jpg"],
            process: ["/assets/portfolio/Project_02/Process/Process_01.jpg", "/assets/portfolio/Project_02/Process/Process_02.jpg"],
            madeHere: ["/assets/portfolio/Project_02/Made_Here/Made_Here_01.jpg", "/assets/portfolio/Project_02/Made_Here/Made_Here_02.jpg"],
            after: ["/assets/portfolio/Project_02/After/hero.jpg", "/assets/portfolio/Project_02/After/After_01.jpg", "/assets/portfolio/Project_02/After/After_02.jpg"]
        }
    },
    {
        id: "p3",
        title: "Blue Velvet Tuxedo Sofa",
        location: "Potomac, MD",
        category: "transformations",
        description: "This mid-century tuxedo sofa was given a new life with a vibrant royal blue velvet. The focus was on maintaining the sharp, clean lines while improving the seat comfort with high-density foam.",
        images: {
            hero: "/assets/portfolio/P2.jpg",
            after: ["/assets/portfolio/P2.jpg"]
        }
    },
    {
        id: "p4",
        title: "Cream Wingback Pair",
        location: "Great Falls, VA",
        category: "residential",
        description: "A pair of elegant wingbacks updated in a soft cream performance fabric. Perfect for a busy living room, this fabric is stain-resistant while looking luxurious.",
        images: {
            hero: "/assets/portfolio/P3.jpg",
            after: ["/assets/portfolio/P3.jpg"]
        }
    },
    {
        id: "p9", // Renumbered from p4 (duplicate)
        title: "Green Velvet Chesterfield",
        location: "Georgetown, DC",
        category: "antique",
        description: "Restoring this classic Chesterfield required careful attention to the button alignment. The emerald green velvet adds a bold, sophisticated touch to the client's library.",
        images: {
            hero: "/assets/portfolio/P4.jpg",
            after: ["/assets/portfolio/P4.jpg"]
        }
    },
    {
        id: "p5",
        title: "Custom Leather Sectional",
        location: "Arlington, VA",
        category: "commercial",
        description: "Designed and built from scratch in our workshop. This modular sectional features top-grain leather and a reinforced hardwood frame for durability.",
        images: {
            hero: "/assets/portfolio/P5.jpg",
            madeHere: ["/assets/portfolio/P5.jpg"]
        }
    },
    {
        id: "p6",
        title: "Modern Club Chair",
        location: "Bethesda, MD",
        category: "residential",
        description: "A streamlined, modern club chair reupholstered in a textured grey weave. Simple, clean, and comfortable.",
        images: {
            hero: "/assets/portfolio/P6.jpg",
            after: ["/assets/portfolio/P6.jpg"]
        }
    },
    {
        id: "p7",
        title: "Patterned Family Heirloom",
        location: "Clarksburg, MD",
        category: "antique",
        description: "This sentimental piece was restored using a complex patterned fabric. Pattern matching was critical to align the design across the seat, back, and arms perfectly.",
        images: {
            hero: "/assets/portfolio/P7.jpg",
            before: ["/assets/portfolio/P7.jpg"] // Placeholder
        }
    },
    {
        id: "p8",
        title: "Striped Chaise Lounge",
        location: "Alexandria, VA",
        category: "residential",
        description: "An elegant chaise featuring a classic stripe pattern. The skirt was tailored to hang perfectly flush with the floor.",
        images: {
            hero: "/assets/portfolio/P8.jpg",
            after: ["/assets/portfolio/P8.jpg"]
        }
    }
];
