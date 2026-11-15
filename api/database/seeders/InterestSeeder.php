<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Interest;


class InterestSeeder extends Seeder
{
    public function run()
    {
        $techInterests = [
            'Web Development',
            'Mobile Development',
            'Artificial Intelligence',
            'Machine Learning',
            'Blockchain',
            'Cloud Computing',
            'Cybersecurity',
            'Data Science',
            'DevOps',
            'Internet of Things (IoT)',
            'Virtual Reality',
            'Augmented Reality',
            'Software Engineering',
            'Game Development',
            'Database Management',
            'UI/UX Design',
            'E-commerce Development',
            'Big Data',
            'Quantum Computing',
            'Embedded Systems'
        ];

        foreach ($techInterests as $interest) {
            Interest::create(['name' => $interest]);
        }
    }
}
