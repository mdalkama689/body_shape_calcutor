'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from 'usehooks-ts';

export default function Mobile() {
  const weightArr = Array.from({ length: 111 }, (_, i) => 40 + i);
  const heightArr = Array.from({ length: 71 }, (_, i) => 140 + i);
  const waistArr = Array.from({ length: 101 }, (_, i) => 50 + i);
  const hipArr = Array.from({ length: 101 }, (_, i) => 50 + i);

  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [waist, setWaist] = useState<number>();
  const [hip, setHip] = useState<number>();
  const [gender, setGender] = useState<string>('');
  const [bodyMassIndex, setBodyMassIndex] = useState<number>();
  const [waistToHipRatio, setWaistToHipRatio] = useState<number>();
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number>();


  const calculateHealthMetrics = () => {
    if (!weight || !height || !waist || !hip || !gender) {
      return toast.error('All fields are required!');
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const whr = waist / hip;
    let bfp = 0;

    if (gender === 'male') {
      bfp = 1.20 * bmi + 0.23 * 21.66 - 16.2;
    } else if (gender === 'female') {
      bfp = 1.20 * bmi + 0.23 * 21.66 - 5.4;
    }

    const formattedBMI = parseFloat(bmi.toFixed(2));
    const formattedWHR = parseFloat(whr.toFixed(2));
    const formattedBFP = parseFloat(bfp.toFixed(2));

    setBodyMassIndex(formattedBMI);
    setBodyFatPercentage(formattedBFP);
    setWaistToHipRatio(formattedWHR);

    toast.success(
      `BMI: ${formattedBMI}, WHR: ${formattedWHR}, BFP: ${formattedBFP}%`
    );
  };

  return (
    <div className="min-h-screen  bg-black text-white py-6 px-4 flex flex-col items-center justify-center">
    <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl font-bold text-white">
          Body Shape Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
  
        <div className="grid gap-2">
          <Label htmlFor="weight" className='text-white'>Weight (kg)</Label>
          <Select onValueChange={(val) => setWeight(Number(val))}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectGroup>
                <SelectLabel>Select your weight</SelectLabel>
                {weightArr.map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item} kg
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
  
        <div className="grid gap-2">
          <Label htmlFor="height" className='text-white'>Height (cm)</Label>
          <Select onValueChange={(val) => setHeight(Number(val))}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
              <SelectValue placeholder="Select height" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectGroup>
                <SelectLabel>Select your height</SelectLabel>
                {heightArr.map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item} cm
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
  
        <div className="grid gap-2">
          <Label htmlFor="waist" className='text-white'>Waist (cm)</Label>
          <Select onValueChange={(val) => setWaist(Number(val))}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
              <SelectValue placeholder="Select waist" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectGroup>
                <SelectLabel>Select your waist</SelectLabel>
                {waistArr.map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item} cm
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
  
        <div className="grid gap-2">
          <Label htmlFor="hip" className='text-white'>Hip (cm)</Label>
          <Select onValueChange={(val) => setHip(Number(val))}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
              <SelectValue placeholder="Select hip" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectGroup>
                <SelectLabel>Select your hip</SelectLabel>
                {hipArr.map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item} cm
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
  
        <div className="grid gap-2">
          <Label htmlFor="gender" className='text-white'>Gender</Label>
          <Select onValueChange={(val) => setGender(val)}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectGroup>
                <SelectLabel>Select your gender</SelectLabel>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
  
        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={calculateHealthMetrics}>
          Calculate
        </Button>
  
  
      </CardContent>
    </Card>
  
    {bodyFatPercentage && bodyMassIndex && waistToHipRatio && (
      <div className="bg-zinc-900 text-white p-4 mt-6 rounded-lg border border-zinc-700 w-full max-w-md text-center space-y-2">
        <p className="text-xl font-semibold text-blue-400">Your Health Metrics</p>
        <p className="text-base">BMI (Body Mass Index): <span className="font-medium text-white">{bodyMassIndex}</span></p>
        <p className="text-base">WHR (Waist-to-Hip Ratio): <span className="font-medium text-white">{waistToHipRatio}</span></p>
        <p className="text-base">BFP (Body Fat Percentage): <span className="font-medium text-white">{bodyFatPercentage}%</span></p>
      </div>
    )}
  
  </div>

  );
}