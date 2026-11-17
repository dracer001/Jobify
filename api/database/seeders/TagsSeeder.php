<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //public function run()
        $tags = [
            'Technology',
            'Design',
            'Marketing',
            'Engineering',
            'Finance',
            'Health',
            'Sales',
            'Education',
            'Construction',
            'Retail',
            'Consulting',
            'Healthcare',
            'Software Development',
            'Data Analysis',
            'Photography',
            'Content Writing',
            'UI/UX Design',
            'Project Management',
            'Customer Service',
            'Cybersecurity',
            'Artificial Intelligence',
            'Machine Learning',
            'Blockchain',
            'Virtual Reality',
            'Graphic Design',
            'Web Development',
            'SEO',
            'Social Media',
            'Accounting',
            'Business Analysis',
            'HR',
            'Legal',
            'Operations',
            'Product Management',
            'E-commerce',
            'Digital Marketing',
            'Recruitment',
            'Networking',
            'Freelancing',
            'Translation',
            'Translation Services',
            'Data Entry',
            'Writing & Editing',
            'Real Estate',
            'Web Design',
            'Event Planning',
            'Public Relations',
            'Non-profit',
            'Telecommunication',
            'Automotive',
            'Agriculture',
            'Energy',
            'Sports',
            'Entertainment',
            'Construction Management',
            'Retail Management',
            'Advertising',
            'Catering',
            'Publishing',
            'Media',
            'Logistics',
            'Tourism',
            'Travel',
            'Art',
            'Film Production',
            'Game Development',
            'Security Services',
            'Environmental Services',
            'Fashion',
            'Music',
            'Food & Beverage',
        ];

        foreach ($tags as $tag) {
            DB::table('tags')->insert([
                'name' => $tag,
            ]);
        }
    }
}
