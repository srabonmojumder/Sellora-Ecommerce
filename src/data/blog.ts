export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: { name: string; avatar: string }
  category: string
  publishedAt: string
  readTime: number
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Sustainable Fashion',
    slug: 'ultimate-guide-sustainable-fashion',
    excerpt: 'Learn how to build a sustainable wardrobe that looks great and helps the environment.',
    content: `
Sustainable fashion is more than just a trend — it's a movement toward a more responsible and conscious way of dressing. As consumers become increasingly aware of the environmental impact of the fashion industry, many are seeking ways to build wardrobes that are both stylish and eco-friendly.

## Why Sustainable Fashion Matters

The fashion industry is one of the largest polluters in the world, contributing to water pollution, textile waste, and carbon emissions. By choosing sustainable fashion, you can help reduce this impact while still looking your best.

## Building a Sustainable Wardrobe

**1. Invest in Quality Over Quantity**
Instead of buying many cheap items that will wear out quickly, invest in fewer, higher-quality pieces that will last for years. Look for well-constructed garments made from durable materials.

**2. Choose Natural and Organic Fabrics**
Opt for clothing made from organic cotton, linen, hemp, or Tencel. These materials are produced with less environmental impact than conventional fabrics.

**3. Support Ethical Brands**
Research brands that prioritize fair labor practices, use sustainable materials, and maintain transparency about their supply chains.

**4. Embrace Second-Hand Shopping**
Thrift stores, consignment shops, and online resale platforms offer a treasure trove of pre-loved clothing. Shopping second-hand extends the life of garments and keeps them out of landfills.

**5. Care for Your Clothes**
Proper maintenance can significantly extend the life of your clothing. Wash in cold water, air dry when possible, and learn basic mending skills.

## The Future of Fashion

As technology advances and consumer awareness grows, sustainable fashion is becoming more accessible and affordable. From innovative recycled materials to circular fashion models, the industry is evolving to meet the demands of conscious consumers.

Making the switch to sustainable fashion doesn't have to happen overnight. Start with small changes and gradually build a wardrobe that reflects your values and personal style.
    `.trim(),
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    author: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    category: 'Fashion',
    publishedAt: '2024-01-20T00:00:00Z',
    readTime: 8,
    tags: ['sustainable', 'fashion', 'eco-friendly'],
  },
  {
    id: '2',
    title: '10 Must-Have Items for Your Capsule Wardrobe',
    slug: '10-must-have-capsule-wardrobe',
    excerpt: 'Discover the essential pieces that will form the foundation of your versatile wardrobe.',
    content: `
A capsule wardrobe is a curated collection of essential clothing items that don't go out of fashion and can be mixed and matched to create a variety of outfits. Here are the 10 must-have items every capsule wardrobe needs.

## The Essential 10

**1. A Well-Fitted White T-Shirt**
The foundation of countless outfits. Look for premium cotton with a flattering cut that works tucked in or worn loose.

**2. Classic Dark Denim Jeans**
A pair of well-fitting dark wash jeans can be dressed up or down for almost any occasion.

**3. A Tailored Blazer**
Whether in black, navy, or camel, a blazer instantly elevates any outfit from casual to polished.

**4. A Little Black Dress**
Timeless and versatile, the LBD works for everything from work events to dinner dates.

**5. White Button-Down Shirt**
Crisp and clean, a white shirt is the ultimate versatile piece that transitions seamlessly from office to weekend.

**6. Neutral Trousers**
Tailored trousers in black or tan provide a polished alternative to jeans for more formal occasions.

**7. A Quality Knit Sweater**
Choose a classic crewneck or V-neck in a neutral color for layering and standalone wear.

**8. A Versatile Coat**
Invest in a quality outerwear piece that complements most of your wardrobe.

**9. Comfortable Loafers or Flats**
Classic footwear that works with both casual and dressy outfits.

**10. A Structured Handbag**
A quality bag in a neutral color ties your whole look together.

## Tips for Building Your Capsule

Start by auditing your current wardrobe. Keep pieces that fit well and make you feel confident. Fill in gaps with the essentials listed above, prioritizing quality and versatility over trends.
    `.trim(),
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    author: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    category: 'Style Tips',
    publishedAt: '2024-01-18T00:00:00Z',
    readTime: 6,
    tags: ['capsule wardrobe', 'style', 'essentials'],
  },
  {
    id: '3',
    title: 'How to Style Your Home for Maximum Comfort',
    slug: 'style-home-maximum-comfort',
    excerpt: 'Transform your living space into a cozy sanctuary with these simple styling tips.',
    content: `
Your home should be your sanctuary — a place where comfort meets style. Here are our expert tips for creating a living space that feels both beautiful and inviting.

## Creating a Cozy Atmosphere

**Layer Your Textiles**
Mix different textures through throw pillows, blankets, and rugs. Combining chunky knits with smooth cotton and soft velvet creates visual interest and physical comfort.

**Warm Lighting is Key**
Replace harsh overhead lights with layered lighting — table lamps, floor lamps, and candles create a warm, inviting ambiance.

**Bring Nature Indoors**
Indoor plants not only purify the air but add life and color to any room. Choose low-maintenance varieties if you're new to plant care.

## Furniture Arrangement

**Create Conversation Areas**
Arrange seating to encourage interaction. In large rooms, create intimate groupings rather than pushing everything against the walls.

**Leave Room to Breathe**
Don't overcrowd your space. Each piece of furniture should have room around it, and there should be clear pathways through every room.

## Color and Mood

**Choose a Calming Palette**
Soft neutrals, warm earth tones, and muted blues create a relaxing atmosphere. Use accent colors sparingly through accessories.

**Personal Touches Matter**
Display items that tell your story — travel souvenirs, family photos, and meaningful artwork make a house feel like home.

Transform your space one room at a time, and remember that the most stylish homes are the ones that reflect the personalities of the people who live in them.
    `.trim(),
    image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80',
    author: { name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=12' },
    category: 'Home & Living',
    publishedAt: '2024-01-15T00:00:00Z',
    readTime: 7,
    tags: ['home decor', 'interior design', 'comfort'],
  },
  {
    id: '4',
    title: 'Tech Gadgets That Will Change Your Life',
    slug: 'tech-gadgets-change-your-life',
    excerpt: 'Explore the latest innovative gadgets that combine style with functionality.',
    content: `
Technology continues to evolve at a rapid pace, bringing us gadgets that not only make life easier but also add a touch of style to our daily routines. Here are the tech gadgets worth investing in this year.

## Wearable Tech

**Smart Watches**
Modern smartwatches do far more than tell time. From fitness tracking to mobile payments, these devices have become essential accessories.

**Wireless Earbuds**
The latest generation of wireless earbuds offers incredible sound quality, active noise cancellation, and all-day battery life in a compact package.

## Home Tech

**Smart Home Hubs**
Control your lights, thermostat, security system, and entertainment from a single device. Smart home technology is becoming more intuitive and affordable.

**Robot Vacuums**
Advanced mapping technology and powerful suction make today's robot vacuums genuinely useful household helpers.

## Productivity Tools

**Portable Monitors**
Lightweight, USB-C powered monitors that fold flat make it easy to set up a dual-screen workspace anywhere.

**Digital Notebooks**
E-ink tablets that let you write naturally while digitizing your notes combine the best of analog and digital worlds.

## What to Look For

When investing in tech gadgets, prioritize build quality, ecosystem compatibility, and long-term software support. The best gadgets are the ones that seamlessly integrate into your lifestyle.
    `.trim(),
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    author: { name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=8' },
    category: 'Technology',
    publishedAt: '2024-01-12T00:00:00Z',
    readTime: 5,
    tags: ['technology', 'gadgets', 'smart home'],
  },
  {
    id: '5',
    title: 'Spring Summer 2024: Trending Colors and Patterns',
    slug: 'spring-summer-2024-trends',
    excerpt: 'Get ahead of the curve with our guide to the hottest fashion trends this season.',
    content: `
The Spring/Summer season brings fresh energy to fashion with vibrant colors, playful patterns, and innovative silhouettes. Here's your comprehensive guide to the trends dominating this season.

## Trending Colors

**Butter Yellow**
Soft, warm yellow is everywhere this season. From flowing dresses to tailored blazers, this cheerful hue brightens any outfit.

**Powder Blue**
A softer alternative to classic navy, powder blue brings a refreshing, calming energy to spring wardrobes.

**Coral Pink**
This warm pink tone flatters nearly every skin tone and works beautifully in both casual and dressy contexts.

**Sage Green**
Nature-inspired sage green continues its reign, offering a sophisticated neutral alternative.

## Must-Try Patterns

**Bold Florals**
Oversized floral prints are making a dramatic statement. Look for large-scale blooms on midi skirts and maxi dresses.

**Geometric Prints**
Clean lines and abstract shapes offer a modern, artistic feel. Mix with solid pieces for balanced styling.

**Stripes Reimagined**
Classic stripes get a fresh update with varying widths, unexpected color combinations, and diagonal orientations.

## Key Silhouettes

**Wide-Leg Trousers**
Comfortable and chic, wide-leg pants are a staple this season. Pair with fitted tops for a balanced look.

**Sheer Layers**
Transparent fabrics add depth and interest. Layer sheer pieces over structured garments for a fashion-forward approach.

Embrace the trends that resonate with your personal style, and don't be afraid to experiment with new colors and patterns this season.
    `.trim(),
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    author: { name: 'Jessica White', avatar: 'https://i.pravatar.cc/150?img=9' },
    category: 'Fashion',
    publishedAt: '2024-01-10T00:00:00Z',
    readTime: 9,
    tags: ['trends', 'spring summer', 'colors'],
  },
  {
    id: '6',
    title: 'The Art of Mindful Shopping',
    slug: 'art-of-mindful-shopping',
    excerpt: 'Make better purchasing decisions and build a collection you truly love.',
    content: `
In a world of fast fashion and endless online options, mindful shopping has become an essential practice for building a wardrobe you truly love. Here's how to shop with intention and purpose.

## What is Mindful Shopping?

Mindful shopping means being intentional about what you buy. It's about pausing before purchasing to consider whether an item truly adds value to your life and wardrobe.

## The 30-Day Rule

Before making a non-essential purchase, wait 30 days. If you still want the item after a month, it's likely a worthwhile investment rather than an impulse buy.

## Quality Checklist

Before buying any garment, check these quality indicators:
- **Seams**: Are they straight and secure?
- **Fabric**: Does it feel substantial and well-made?
- **Hardware**: Are zippers smooth and buttons secure?
- **Fit**: Does it flatter your body without alterations?

## Cost Per Wear

Calculate the cost per wear by dividing the price by the number of times you expect to wear it. A $200 coat worn 100 times is better value than a $30 jacket worn twice.

## Building a Wish List

Instead of shopping impulsively, maintain a running wish list. This helps you identify genuine needs versus momentary wants and makes it easier to shop during sales strategically.

## The One-In-One-Out Rule

For every new item you bring into your wardrobe, let go of one you no longer wear. This prevents closet overflow and encourages thoughtful purchasing.

Mindful shopping isn't about deprivation — it's about curating a collection of items that bring you joy and serve you well for years to come.
    `.trim(),
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    author: { name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=13' },
    category: 'Lifestyle',
    publishedAt: '2024-01-08T00:00:00Z',
    readTime: 6,
    tags: ['mindful shopping', 'lifestyle', 'wardrobe'],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
