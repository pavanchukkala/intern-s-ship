// app/internship/[id]/page.tsx
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata";
import Link from "next/link";
import { motion } from "framer-motion";

// Pre-generate static pages for each internship document by its ID
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "internships"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

interface InternshipData {
  id: string;
  [key: string]: any;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default async function InternshipDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const docRef = doc(db, "internships", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <Link href="/" className="text-blue-500 hover:underline mb-4">
          &larr; Back to Home
        </Link>
        <p className="text-xl">Internship not found.</p>
      </div>
    );
  }

  const data = docSnap.data();
  const hasHeaderData = data.logo || data.company || data.role;

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {hasHeaderData ? (
        <motion.header
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-4 text-center">
            {data.logo ? (
              <motion.img
                src={data.logo}
                alt={data.company || "Logo"}
                className="mx-auto h-24 w-24 rounded-full border-4 border-white shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ) : (
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-300">
                <span className="text-3xl font-bold text-gray-800">?</span>
              </div>
            )}
            {data.company && (
              <motion.h1
                className="text-4xl font-bold text-white mt-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              >
                {data.company}
              </motion.h1>
            )}
            {data.role && (
              <motion.p
                className="text-lg text-white mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {data.role}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                href="/"
                className="mt-4 inline-block bg-white text-indigo-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                &larr; Back to Internships
              </Link>
            </motion.div>
          </div>
        </motion.header>
      ) : (
        <motion.header
          className="bg-gradient-to-r from-gray-700 to-gray-900 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-3xl font-bold text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              Internship Details
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/"
                className="mt-4 inline-block bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              >
                &larr; Back to Internships
              </Link>
            </motion.div>
          </div>
        </motion.header>
      )}

      <motion.main
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Internship Information
          </motion.h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(data).map(([key, value]) => (
              <motion.div
                key={key}
                className="py-2"
                whileHover={{ backgroundColor: "#f0f0f0" }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-semibold capitalize">{key}:</span>
                <div className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : value.toString()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
