// File: app/bmi-calculator/page.tsx (Fonksiyonel BMI Hesaplayıcı - Düzeltilmiş)
'use client';

import { useState, useMemo } from 'react';

export default function BMICalculatorPage() {
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightInches, setHeightInches] = useState(''); // For imperial feet and inches

  const bmiResult = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const h_in = parseFloat(heightInches);

    if (w > 0 && h > 0) {
      if (unitSystem === 'metric') {
        // BMI = weight (kg) / [height (m)]^2
        const heightInMeters = h / 100;
        return w / (heightInMeters * heightInMeters);
      } else {
        // BMI = 703 * weight (lbs) / [height (in)]^2
        const totalHeightInInches = h * 12 + (h_in || 0);
        if (totalHeightInInches === 0) return null;
        return (w / (totalHeightInInches * totalHeightInInches)) * 703;
      }
    }
    return null;
  }, [weight, height, heightInches, unitSystem]);

  const getBmiCategory = (bmi: number | null) => {
    if (bmi === null) return { category: '', color: 'text-gray-800' };
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi >= 18.5 && bmi < 25) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmi >= 25 && bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiCategory = getBmiCategory(bmiResult);

  return (
    <>
      <div className="bg-white py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">BMI Calculator</h1>
            
            {/* Unit System Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-200 p-1 rounded-lg flex space-x-1">
                <button onClick={() => setUnitSystem('metric')} className={`px-4 py-2 rounded-md text-sm font-medium ${unitSystem === 'metric' ? 'bg-white shadow' : 'text-gray-600'}`}>Metric</button>
                <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-2 rounded-md text-sm font-medium ${unitSystem === 'imperial' ? 'bg-white shadow' : 'text-gray-600'}`}>Imperial</button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{unitSystem === 'metric' ? 'Height (cm)' : 'Height (ft & in)'}</label>
                <div className={`flex items-center space-x-2 ${unitSystem === 'metric' ? 'hidden' : ''}`}>
                    <input type="number" placeholder="ft" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="number" placeholder="in" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                 <div className={`${unitSystem === 'imperial' ? 'hidden' : ''}`}>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
            </div>

            {/* Result Display */}
            {bmiResult !== null && (
              <div className="mt-8 text-center bg-indigo-50 p-6 rounded-lg">
                <p className="text-lg text-gray-600">Your BMI is</p>
                <p className="text-5xl font-bold text-indigo-600 my-2">{bmiResult.toFixed(1)}</p>
                <p className={`text-xl font-semibold ${bmiCategory.color}`}>{bmiCategory.category}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Complete SEO Content Section for BMI Calculator */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-gray-700">
          
          {/* Main Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            🧮 BMI Calculator - Free Body Mass Index Calculator & Health Assessment Tool
          </h1>
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">📊 What is BMI Calculator?</h2>
            <p className="mb-4 text-lg">
              The <strong>BMI Calculator</strong> (Body Mass Index Calculator) is a free, easy-to-use online tool that helps you determine whether your weight is within a healthy range for your height. BMI is a widely accepted measurement used by healthcare professionals, fitness experts, and individuals worldwide to assess body weight status and potential health risks.
            </p>
            <p className="mb-4">
              BMI calculation is based on a simple mathematical formula that compares your weight to your height, providing an objective assessment of whether you are underweight, normal weight, overweight, or obese. This essential health metric serves as a screening tool to identify potential weight-related health problems in adults.
            </p>
          </div>

          {/* BMI Categories */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 BMI Categories and Health Implications</h2>
            <p className="mb-6">Understanding your BMI category is crucial for maintaining optimal health:</p>
            
            {/* Underweight */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="text-xl font-bold text-blue-700 mb-2">🔵 Underweight (BMI Below 18.5)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Malnutrition, weakened immune system, osteoporosis risk</li>
                <li><strong>Recommendations:</strong> Increase caloric intake with nutrient-dense foods, consult healthcare provider</li>
              </ul>
            </div>

            {/* Normal Weight */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="text-xl font-bold text-green-700 mb-2">🟢 Normal Weight (BMI 18.5-24.9)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Status:</strong> Ideal weight range for most adults</li>
                <li><strong>Recommendations:</strong> Maintain current weight through balanced diet and regular exercise</li>
              </ul>
            </div>

            {/* Overweight */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">🟡 Overweight (BMI 25.0-29.9)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Increased risk of heart disease, type 2 diabetes, high blood pressure</li>
                <li><strong>Recommendations:</strong> Gradual weight loss through caloric deficit and increased physical activity</li>
              </ul>
            </div>

            {/* Obese Classes */}
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <h3 className="text-xl font-bold text-red-700 mb-2">🔴 Obese (BMI 30.0+)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Significantly elevated risk of cardiovascular disease, diabetes, sleep apnea</li>
                <li><strong>Recommendations:</strong> Structured weight loss program with medical supervision</li>
              </ul>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">📏 Additional Health Metrics to Consider</h2>
            <p className="mb-4">Complement your BMI calculation with these important health measurements:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow border-t-4 border-indigo-400">
                <h3 className="text-lg font-bold text-indigo-600 mb-2">📐 Waist Circumference</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Men:</strong> Health risk increases above 40 inches (102 cm)</li>
                  <li><strong>Women:</strong> Health risk increases above 35 inches (88 cm)</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow border-t-4 border-indigo-400">
                <h3 className="text-lg font-bold text-indigo-600 mb-2">🔢 Body Fat Percentage</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Men:</strong> Healthy range 10-20%</li>
                  <li><strong>Women:</strong> Healthy range 16-25%</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow border-t-4 border-indigo-400">
                <h3 className="text-lg font-bold text-indigo-600 mb-2">📊 Waist-to-Hip Ratio</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Calculation:</strong> Waist ÷ Hip circumference</li>
                  {/* CORRECTED LINE BELOW */}
                  <li><strong>Risk Level:</strong> &gt;0.9 (men) or &gt;0.85 (women)</li>
                  <li><strong>Significance:</strong> Indicates fat distribution pattern</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-200 rounded p-4 text-center">
            <p className="text-sm text-gray-600">
              <strong>⚠️ Disclaimer:</strong> This BMI calculator and information are for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for personalized health recommendations and treatment plans.
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}
