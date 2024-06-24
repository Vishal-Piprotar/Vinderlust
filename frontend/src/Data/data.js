// Import room images
import Room1 from '../assets/img/rooms/1.png';
import Room2 from '../assets/img/rooms/2.png';
import Room3 from '../assets/img/rooms/3.png';
import Room4 from '../assets/img/rooms/4.png';
import Room5 from '../assets/img/rooms/5.png';
import Room6 from '../assets/img/rooms/6.png';
import Room7 from '../assets/img/rooms/7.png';
import Room8 from '../assets/img/rooms/8.png';
import Room9 from '../assets/img/rooms/a.avif';

// Import large room images
import Room1Lg from '../assets/img/rooms/1-lg.png';
import Room2Lg from '../assets/img/rooms/2-lg.png';
import Room3Lg from '../assets/img/rooms/3-lg.png';
import Room4Lg from '../assets/img/rooms/4-lg.png';
import Room5Lg from '../assets/img/rooms/5-lg.png';
import Room6Lg from '../assets/img/rooms/6-lg.png';
import Room7Lg from '../assets/img/rooms/7-lg.png';
import Room8Lg from '../assets/img/rooms/8-lg.png';

export const roomData = [
  {
    id: 1,
    name: "Hotel Good Palace",
    city: "Ahmedabad",
    address: "7240C Argyle St. Lawndale, CA 90260",
    phoneNo: "99999 99999",
    img: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate: "4/5",
    flagship: true,
    coupons: ["10% off on weekdays", "Free breakfast with two-night stay"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "A cozy single room perfect for solo travelers. Features a comfortable bed and modern amenities.",
        image: Room9,
        imageLg: Room9,
        bed: "1",
        star: "5",
        rating: "4 / 5",
        price: "999",
        size: 84,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "Spacious double room with two beds, ideal for couples or small families. Includes a great city view.",
        image: Room2,
        imageLg: Room2Lg,
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1499",
        size: 90,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "Luxurious suite with a separate living area, perfect for extended stays. Includes premium amenities.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star:"5",
        rating: "5 / 5",
        price: "1999",
        size: 120,
        maxPerson: 3
      },
      {
        id: 4,
        type: "single",
        description: "A cozy single room perfect for solo travelers. Features a comfortable bed and modern amenities.",
        image: Room1,
        imageLg: Room1Lg,
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "649",
        size: 84,
        maxPerson: 1
      },
      {
        id: 5,
        type: "double",
        description: "Spacious double room with two beds, ideal for couples or small families. Includes a great city view.",
        image: "https://img.freepik.com/free-photo/pillow-bed_74190-2048.jpg?t=st=1719048598~exp=1719052198~hmac=5217e5ee305e5562374f1598c7b10c9fc3f0da031ae618c38fdf3be0f1c4712b&w=996",
        imageLg: "https://img.freepik.com/free-photo/pillow-bed_74190-2048.jpg?t=st=1719048598~exp=1719052198~hmac=5217e5ee305e5562374f1598c7b10c9fc3f0da031ae618c38fdf3be0f1c4712b&w=996",
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1199",
        size: 90,
        maxPerson: 2
      },
      // Add more rooms here...
    ]
  },
  {
    id: 10,
    name: "Hotel TajMahal Palace",
    city: "Ahmedabad",
    address: "7240C Argyle St. Lawndale, CA 90260",
    phoneNo: "99999 99999",
    img:"https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate:"3/5",
    flagship: true,
    coupons: ["10% off on weekdays", "Free breakfast with two-night stay"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "A cozy single room perfect for solo travelers. Features a comfortable bed and modern amenities.",
        image: "https://img.freepik.com/free-photo/hotel-bedroom-with-double-bed-table-tv-set_1262-3034.jpg?t=st=1719047966~exp=1719051566~hmac=ee0f0886a355a02c339c8dcf634563dca16c6ed237004244b4efcc62fc963d0a&w=996",
        imageLg: "https://img.freepik.com/free-photo/hotel-bedroom-with-double-bed-table-tv-set_1262-3034.jpg?t=st=1719047966~exp=1719051566~hmac=ee0f0886a355a02c339c8dcf634563dca16c6ed237004244b4efcc62fc963d0a&w=996",
        
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "899",
        size: 84,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "Spacious double room with two beds, ideal for couples or small families. Includes a great city view.",
        image: "https://img.freepik.com/free-photo/interior-design-bedroom-with-modern-decoration_181624-46706.jpg?t=st=1719048618~exp=1719052218~hmac=c1573f3ec0fb40402450cd52195c322c6d705ccb17214e0572e57674591a544c&w=996",
        imageLg: "https://img.freepik.com/free-photo/interior-design-bedroom-with-modern-decoration_181624-46706.jpg?t=st=1719048618~exp=1719052218~hmac=c1573f3ec0fb40402450cd52195c322c6d705ccb17214e0572e57674591a544c&w=996",
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1099",
        size: 90,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "Luxurious suite with a separate living area, perfect for extended stays. Includes premium amenities.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star:"5",
        rating: "5 / 5",
        price: "1299",
        size: 120,
        maxPerson: 3
      },
      {
        id: 4,
        type: "single",
        description: "A cozy single room perfect for solo travelers. Features a comfortable bed and modern amenities.",
        image: "https://img.freepik.com/free-photo/high-angle-shot-bedroom-with-interior-stuff-beige-tones_181624-33128.jpg?t=st=1719048065~exp=1719051665~hmac=7bf4e3466a87bd45d6deac046b9e08a3c5aba26f45698d5b4451db63b3e71206&w=996",
        imageLg: "https://img.freepik.com/free-photo/high-angle-shot-bedroom-with-interior-stuff-beige-tones_181624-33128.jpg?t=st=1719048065~exp=1719051665~hmac=7bf4e3466a87bd45d6deac046b9e08a3c5aba26f45698d5b4451db63b3e71206&w=996",
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "849",
        size: 84,
        maxPerson: 1
      },
      {
        id: 5,
        type: "double",
        description: "Spacious double room with two beds, ideal for couples or small families. Includes a great city view.",
        image: "https://img.freepik.com/free-photo/interior-design-bedroom-with-modern-decoration_181624-46706.jpg?t=st=1719048618~exp=1719052218~hmac=c1573f3ec0fb40402450cd52195c322c6d705ccb17214e0572e57674591a544c&w=996",
        imageLg: "https://img.freepik.com/free-photo/interior-design-bedroom-with-modern-decoration_181624-46706.jpg?t=st=1719048618~exp=1719052218~hmac=c1573f3ec0fb40402450cd52195c322c6d705ccb17214e0572e57674591a544c&w=996",
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1499",
        size: 90,
        maxPerson: 2
      },
      // Add more rooms here...
    ]
  },
  {
    id: 2,
    name: "Hotel Royal Palace",
    city: "Surat",
    address: "1234 Main St. Anytown, CA 12345",
    phoneNo: "88888 88888",
    img:"https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate:"4/5",
    flagship: false,
    coupons: ["5% off on weekends", "Late checkout on Sundays"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "Comfortable single room with all the essential amenities for a relaxing stay.",
        image: "https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2301.jpg?t=st=1719048181~exp=1719051781~hmac=ac25b35cd161a1aa3293d5928f5d5592996f4bcbfd30786df22c4f289e53fc08&w=996",
        imageLg: "https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2301.jpg?t=st=1719048181~exp=1719051781~hmac=ac25b35cd161a1aa3293d5928f5d5592996f4bcbfd30786df22c4f289e53fc08&w=996",
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "899",
        size: 80,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "Elegant double room featuring modern decor and a beautiful view of the city skyline.",
        image: Room5,
        imageLg: Room5Lg,
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1399",
        size: 100,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "Spacious suite with luxurious furnishings and a separate lounge area. Ideal for luxury seekers.",
        image: Room6,
        imageLg: Room6Lg,
        bed: "2",
        star:"5",
        rating: "5 / 5",
        price: "2499",
        size: 140,
        maxPerson: 3
      },
      // Add more rooms here...
    ]
  },
  {
    id: 3,
    name: "Hotel Grand Plaza",
    city: "Vadodara",
    address: "4567 Elm St. Othertown, CA 67890",
    phoneNo: "77777 77777",
    img:"https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate:"3/5",
    flagship: false,
    coupons: ["15% off for stays longer than 3 nights", "Complimentary dinner on the first night"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "Modern single room with a comfortable bed, work desk, and free Wi-Fi.",
        image: Room7,
        imageLg: Room7Lg,
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "899",
        size: 88,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "Chic double room with stylish decor and all the necessary amenities for a pleasant stay.",
        image: Room8,
        imageLg: Room8Lg,
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1299",
        size: 95,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "Exclusive suite offering a separate living area and a luxurious bathroom with a jacuzzi.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star:"5",
        rating: "5 / 5",
        price: "2000",
        size: 150,
        maxPerson: 3
      },
      // Add more rooms here...
    ]
  },
  {
    id: 4,
    name: "Hotel City Inn",
    city: "Rajkot",
    address: "8901 Oak St. Sometown, CA 23456",
    phoneNo: "66666 66666",
    img:"https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate:"4/5",
    flagship: true,
    coupons: ["20% off on advance bookings", "Free airport shuttle service"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "Comfortable single room with modern amenities and a serene ambiance.",
        image: "https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg?t=st=1719048409~exp=1719052009~hmac=f00f2e9902c8b2ce04a5c89b8a7c866af09adec0803a25f4f57a253544037138&w=996",
        imageLg: "https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg?t=st=1719048409~exp=1719052009~hmac=f00f2e9902c8b2ce04a5c89b8a7c866af09adec0803a25f4f57a253544037138&w=996",
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "888",
        size: 86,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "Spacious double room with contemporary decor and a lovely garden view.",
        image: "https://img.freepik.com/free-photo/cozy-lively-home-interior-design_23-2151119016.jpg?t=st=1719048690~exp=1719052290~hmac=4bf9eac682caef07f6626d523414be9f5d150879f76be655a4adc627845d2dbb&w=900",
        imageLg: "https://img.freepik.com/free-photo/cozy-lively-home-interior-design_23-2151119016.jpg?t=st=1719048690~exp=1719052290~hmac=4bf9eac682caef07f6626d523414be9f5d150879f76be655a4adc627845d2dbb&w=900",
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1049",
        size: 92,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "Luxury suite with a separate living room, offering an opulent stay experience.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star:"5",
        rating: "5 / 5",
        price: "2999",
        size: 130,
        maxPerson: 3
      },
      // Add more rooms here...
    ]
  },
  {
    id: 5,
    name: "Hotel Elite",
    city: "Bhavnagar",
    address: "2345 Maple St. Anothertown, CA 56789",
    phoneNo: "55555 55555",
    img:"https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate:"3/5",
    flagship: false,
    coupons: ["10% off on stays longer than 2 nights", "Free welcome drink"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "Cozy single room with essential amenities for a comfortable stay.",
        image: Room4,
        imageLg: Room4Lg,
        bed: "1",
        star:"5",
        rating: "4 / 5",
        price: "999",
        size: 82,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "Elegant double room with a beautiful view and modern amenities.",
        image: Room5,
        imageLg: Room5Lg,
        bed: "2",
        star:"5",
        rating: "4.5 / 5",
        price: "1299",
        size: 94,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "Luxury suite offering a separate living area and premium amenities for a lavish stay.",
        image: Room6,
        imageLg: Room6Lg,
        bed: "2",
        star:"5",
        rating: "5 / 5",
        price: "1499",
        size: 135,
        maxPerson: 3
      },
      // Add more rooms here...
    ]
  },
  // Added new hotels in additional cities
  {
    id: 6,
    name: "Hotel Blue Diamond",
    city: "Jamnagar",
    address: "12 Pearl St. Seaside, CA 34567",
    phoneNo: "44444 44444",
    img: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate: "4/5",
    flagship: true,
    coupons: ["10% off on stays over 3 nights", "Free breakfast"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "A cozy single room with all the necessary amenities for a comfortable stay.",
        image: "https://img.freepik.com/free-photo/modern-luxury-bedroom-suite-bathroom_105762-1791.jpg?t=st=1719046841~exp=1719050441~hmac=2abdcbe768cfd8e7cf5a6275b88a022c49015303bc8c0360f718a5207d3c20dd&w=996",
        imageLg: "https://img.freepik.com/free-photo/modern-luxury-bedroom-suite-bathroom_105762-1791.jpg?t=st=1719046841~exp=1719050441~hmac=2abdcbe768cfd8e7cf5a6275b88a022c49015303bc8c0360f718a5207d3c20dd&w=996",
        bed: "1",
        star: "5",
        rating: "4 / 5",
        price: "1085",
        size: 85,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "A spacious double room with a beautiful view and modern decor.",
        image: "https://img.freepik.com/free-photo/cozy-lively-home-interior-design_23-2151119016.jpg?t=st=1719048690~exp=1719052290~hmac=4bf9eac682caef07f6626d523414be9f5d150879f76be655a4adc627845d2dbb&w=900",
        imageLg: "https://img.freepik.com/free-photo/cozy-lively-home-interior-design_23-2151119016.jpg?t=st=1719048690~exp=1719052290~hmac=4bf9eac682caef07f6626d523414be9f5d150879f76be655a4adc627845d2dbb&w=900",
        bed: "2",
        star: "5",
        rating: "4.5 / 5",
        price: "2440",
        size: 92,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "A luxurious suite with separate living and dining areas, perfect for a premium stay.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "4200",
        size: 155,
        maxPerson: 3
      }
    ]
  },
  {
    id: 7,
    name: "Hotel Green Valley",
    city: "Gandhinagar",
    address: "34 Greenway St. Uptown, CA 45678",
    phoneNo: "33333 33333",
    img: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate: "4.5/5",
    flagship: true,
    coupons: ["15% off on advance booking", "Free airport pickup"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "A stylish single room with modern amenities and a comfortable bed.",
        image: Room4,
        imageLg: Room4Lg,
        bed: "1",
        star: "5",
        rating: "4 / 5",
        price: "1199",
        size: 87,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "A double room with elegant decor, offering a scenic view and premium amenities.",
        image: Room5,
        imageLg: Room5Lg,
        bed: "2",
        star: "5",
        rating: "4.5 / 5",
        price: "3499",
        size: 95,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "A grand suite with luxurious features, including a separate lounge and dining area.",
        image: Room6,
        imageLg: Room6Lg,
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "4999",
        size: 160,
        maxPerson: 3
      }
    ]
  },
  {
    id: 8,
    name: "Hotel Silver Lake",
    city: "Nadiad",
    address: "56 Lakeview St. Riverside, CA 56789",
    phoneNo: "22222 22222",
    img: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate: "3.5/5",
    flagship: false,
    coupons: ["10% off on weekend stays", "Free parking"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "A single room with essential amenities, perfect for solo travelers.",
        image: Room7,
        imageLg: Room7Lg,
        bed: "1",
        star: "5",
        rating: "4 / 5",
        price: "849",
        size: 83,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "A comfortable double room with modern furnishings and a nice view.",
        image: Room8,
        imageLg: Room8Lg,
        bed: "2",
        star: "5",
        rating: "4.5 / 5",
        price: "1200",
        size: 90,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "A premium suite with ample space, featuring a separate living area and top-notch amenities.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "1499",
        size: 145,
        maxPerson: 3
      }
    ]
  },
  {
    id: 9,
    name: "Hotel Mountain View",
    city: "Dwarka",
    address: "78 Hilltop St. Mountainville, CA 67890",
    phoneNo: "11111 11111",
    img: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?size=626&ext=jpg&ga=GA1.1.295017281.1718798084&semt=sph",
    rate: "4.5/5",
    flagship: true,
    coupons: ["20% off for stays longer than 4 nights", "Free spa access"],
    rooms: [
      {
        id: 1,
        type: "single",
        description: "A cozy single room with stunning mountain views and modern amenities.",
        image: "https://img.freepik.com/free-photo/room-interior-hotel-bedroom_23-2150683419.jpg?t=st=1719048526~exp=1719052126~hmac=526032da39c4056abe7cc9ef654d446737c034b607247d403ca1be5a5d2daafd&w=996",
        imageLg: "https://img.freepik.com/free-photo/room-interior-hotel-bedroom_23-2150683419.jpg?t=st=1719048526~exp=1719052126~hmac=526032da39c4056abe7cc9ef654d446737c034b607247d403ca1be5a5d2daafd&w=996",
        bed: "1",
        star: "5",
        rating: "4 / 5",
        price: "999",
        size: 85,
        maxPerson: 1
      },
      {
        id: 2,
        type: "double",
        description: "A spacious double room with a balcony offering panoramic mountain views.",
        image: "https://img.freepik.com/free-photo/cozy-lively-home-interior-design_23-2151118955.jpg?t=st=1719048756~exp=1719052356~hmac=83403a03a0d1d422915c483b52ca193226147fd493eb91267b08dfe5e46a6966&w=900",
        imageLg: "https://img.freepik.com/free-photo/cozy-lively-home-interior-design_23-2151118955.jpg?t=st=1719048756~exp=1719052356~hmac=83403a03a0d1d422915c483b52ca193226147fd493eb91267b08dfe5e46a6966&w=900",
        bed: "2",
        star: "5",
        rating: "4.5 / 5",
        price: "1499",
        size: 98,
        maxPerson: 2
      },
      {
        id: 3,
        type: "suite",
        description: "A luxurious suite with a separate living area and breathtaking views of the mountains.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "2049",
        size: 165,
        maxPerson: 3
      },
      {
        id: 4,
        type: "single",
        description: "A luxurious suite with a separate living area and breathtaking views of the mountains.",
        image: "https://img.freepik.com/free-photo/cozy-studio-apartment-with-bedroom-living-space_1262-12323.jpg?t=st=1719048960~exp=1719052560~hmac=6b34071d3425abecdc0d06662885d190383b29f562f05eb3dfa2d8185689f38a&w=996",
        imageLg: "https://img.freepik.com/free-photo/cozy-studio-apartment-with-bedroom-living-space_1262-12323.jpg?t=st=1719048960~exp=1719052560~hmac=6b34071d3425abecdc0d06662885d190383b29f562f05eb3dfa2d8185689f38a&w=996",
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "899",
        size: 65,
        maxPerson: 3
      },
      {
        id: 5,
        type: "double",
        description: "A luxurious suite with a separate living area and breathtaking views of the mountains.",
        image: "https://img.freepik.com/free-photo/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv_105762-2071.jpg?t=st=1719049000~exp=1719052600~hmac=ea52f6181b78ab182100efb493eb70be975dad328b5e6db022419b1d4659ffa6&w=996",
        imageLg: "https://img.freepik.com/free-photo/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv_105762-2071.jpg?t=st=1719049000~exp=1719052600~hmac=ea52f6181b78ab182100efb493eb70be975dad328b5e6db022419b1d4659ffa6&w=996",
        bed: "2",
        star: "5",
        rating: "4 / 5",
        price: "1299",
        size: 120,
        maxPerson: 3
      },
      {
        id: 6,
        type: "suite",
        description: "A luxurious suite with a separate living area and breathtaking views of the mountains.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "2899",
        size: 165,
        maxPerson: 3
      },
      {
        id: 7,
        type: "suite",
        description: "A luxurious suite with a separate living area and breathtaking views of the mountains.",
        image: "https://img.freepik.com/free-photo/high-angle-shot-bedroom-with-interior-stuff-beige-tones_181624-33128.jpg?t=st=1719049124~exp=1719052724~hmac=914ec9c25793be76c54c483ab06a55d7d3de60e4e60d96b1b1d4880f5fa96738&w=996",
        imageLg: "https://img.freepik.com/free-photo/high-angle-shot-bedroom-with-interior-stuff-beige-tones_181624-33128.jpg?t=st=1719049124~exp=1719052724~hmac=914ec9c25793be76c54c483ab06a55d7d3de60e4e60d96b1b1d4880f5fa96738&w=996",
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "2999",
        size: 165,
        maxPerson: 3
      },
      {
        id: 8,
        type: "single",
        description: "A luxurious suite with a separate living area and breathtaking views of the mountains.",
        image: Room3,
        imageLg: Room3Lg,
        bed: "2",
        star: "5",
        rating: "5 / 5",
        price: "649",
        size: 165,
        maxPerson: 3
      },
    ]
  }
];
