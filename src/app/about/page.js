import Link from 'next/link';

const About = () => {
    return (
        <div className="p-8 bg-gradient-to-br from-blue-500 to-black h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">THEY NOT LIKE US 🗣️🗿</h2>
            <p className="text-white text-lg mb-4 text-justify">
                Welcome to BookMyFlight! We believe that booking flights should be as seamless as your travel experience. Our mission is to empower travelers with a user-friendly platform that allows you to effortlessly search for and book flights that suit your needs. Whether you're planning a weekend getaway or a business trip, we've got you covered!
                Additionally, we have developed a shortest route finder using <strong>Dijkstra's algorithm</strong>. This feature helps users find the most efficient path between destinations, ensuring you make the best travel choices.
            </p>
            <div className="flex items-center mb-6">
                <img 
                    src="/assets/image.png" // Replace with your actual image path
                    alt="Sarang Rastogi"
                    className="w-32 h-32 rounded-full mr-4 shadow-lg object-cover" // Added shadow for depth
                />
                <p className="flex-1 text-white text-lg">
                    I’m <a href="https://www.linkedin.com/in/sarang-rastogi-498948249/" target="_blank" rel="noopener noreferrer"><strong>Sarang Rastogi</strong></a>, a gaming connoisseur and a full-stack developer currently pursuing a B.Tech in Computer Science and Engineering. I’m passionate about creating innovative solutions and enjoy the challenges of development.
                </p>
            </div>
            <div className="flex items-center mb-6">
                <img 
                    src="/assets/ruq.png" // Replace with Ruqayya's actual image path
                    alt="Ruqayya Shah"
                    className="w-32 h-32 rounded-full mr-4 shadow-lg" // Added shadow for depth
                />
                <p className="flex-1 text-white text-lg">
                    I'm <a href="https://www.linkedin.com/in/ruqayya-shah-92032923b/" target="_blank" rel="noopener noreferrer"><strong>Ruqayya Shah</strong></a>, a talented frontend developer. Currently pursuing her B.Tech in Computer Science and Engineering, I have a keen eye for design and a passion for crafting user-friendly interfaces.
                </p>
            </div>
            <h2 className="text-2xl font-bold text-yellow-400 mt-4 mb-2">Special Thanks</h2>
            <p className="text-white text-lg text-center mb-4">
                A special thanks to our friend <a href="https://www.linkedin.com/in/tejas-chauhan-3051a2275/" target="_blank" rel="noopener noreferrer"><strong>Tejas Chauhan</strong></a> for his help in making this project, and to our teachers <strong>Dr. Sumit Kumar</strong> for their guidance!
            </p>
            <Link href="/" passHref>
                <button className="bg-yellow-400 text-purple-900 font-bold px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105 mt-4">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default About;
