import Layout from "@/components/layout/layout";
import { useNavigate } from 'react-router-dom';
import Back from '@/assets/Score/Back.svg'

const Score = () => {
  const navigate = useNavigate()

  const handleClickBackButton = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
      <img
                className='cursor-pointer '
                onClick={handleClickBackButton}
                src={Back} alt='x' />
        <h1 className="text-3xl font-bold mb-4 text-center">Nutrition Guide for Pregnant Women</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Nutrients to Avoid in Excess</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Vitamin A/μgRAE:</strong> Excessive intake can lead to fetal deformities.</li>
            <li><strong>Vitamin D/μg:</strong> Excessive vitamin D can be harmful to the fetus, but adequate amounts are necessary.</li>
            <li><strong>Iron/Mg:</strong> Too much iron intake can be harmful to health, so it’s important to maintain an appropriate level.</li>
            <li><strong>Sodium/Mg:</strong> Excessive sodium intake can lead to problems such as hypertension.</li>
            <li><strong>Saturated Fatty Acid/G:</strong> Overconsumption of saturated fatty acids can be unhealthy.</li>
            <li><strong>Trans Fatty Acid/G:</strong> Trans fats can negatively affect cardiovascular health.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Essential Nutrients for Pregnant Women</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Protein/G:</strong> Essential for the growth and development of the fetus.</li>
            <li><strong>Calcium/Mg:</strong> Important for bone and teeth formation, and necessary for the mother's bone health.</li>
            <li><strong>Iron/Mg:</strong> Crucial for blood production, and the iron requirement increases during pregnancy.</li>
            <li><strong>Vitamin C/Mg:</strong> Helps boost immunity and aids in iron absorption.</li>
            <li><strong>Vitamin D/μg:</strong> Aids in calcium absorption and contributes to bone health.</li>
            <li><strong>Dietary Fiber/G:</strong> Helps maintain digestive health and prevents constipation.</li>
            <li><strong>Potassium/Mg:</strong> Important for fluid balance and blood pressure regulation.</li>
            <li><strong>Folate (Vitamin B9):</strong> Essential for fetal neural tube development.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}

export default Score;