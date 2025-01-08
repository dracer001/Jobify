<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            ['name' => 'Technology', 'description' => 'Technology-related jobs including IT, software, and web development.'],
            ['name' => 'Design', 'description' => 'Jobs related to graphic design, web design, and visual arts.'],
            ['name' => 'Marketing', 'description' => 'Jobs in marketing, advertising, and digital promotions.'],
            ['name' => 'Engineering', 'description' => 'Engineering roles including mechanical, electrical, civil, and other fields.'],
            ['name' => 'Healthcare', 'description' => 'Jobs in healthcare, including medical professionals, technicians, and support staff.'],
            ['name' => 'Education', 'description' => 'Teaching and educational roles for all levels.'],
            ['name' => 'Finance', 'description' => 'Jobs in the finance sector, including banking, investment, and accounting.'],
            ['name' => 'Sales', 'description' => 'Sales-related jobs in various industries, including retail and B2B sales.'],
            ['name' => 'Legal', 'description' => 'Legal professionals including lawyers, paralegals, and legal assistants.'],
            ['name' => 'Human Resources', 'description' => 'HR and recruiting positions, including talent management and employee relations.'],
            ['name' => 'Customer Service', 'description' => 'Customer-facing roles, including support staff and service representatives.'],
            ['name' => 'Consulting', 'description' => 'Consulting jobs across various industries such as business, IT, and management.'],
            ['name' => 'Construction', 'description' => 'Construction and skilled trades roles in building and infrastructure.'],
            ['name' => 'Retail', 'description' => 'Jobs in retail stores, merchandising, and store management.'],
            ['name' => 'Media', 'description' => 'Media-related jobs in journalism, broadcasting, and entertainment.'],
            ['name' => 'Arts', 'description' => 'Creative jobs in the arts, including actors, painters, and musicians.'],
            ['name' => 'Real Estate', 'description' => 'Real estate jobs including agents, brokers, and property managers.'],
            ['name' => 'Hospitality', 'description' => 'Jobs in the hospitality industry, including hotels, restaurants, and tourism.'],
            ['name' => 'Government', 'description' => 'Public sector jobs in government agencies and services.'],
            ['name' => 'Non-profit', 'description' => 'Jobs in non-profit organizations, including social services and charity work.'],
            ['name' => 'Transport & Logistics', 'description' => 'Jobs in logistics, transportation, and supply chain management.'],
            ['name' => 'Retail Management', 'description' => 'Leadership roles in retail including store managers and district managers.'],
            ['name' => 'Entertainment', 'description' => 'Jobs in the entertainment industry including film, TV, and performing arts.'],
            ['name' => 'Media Production', 'description' => 'Jobs in media production including directors, producers, and camera operators.'],
            ['name' => 'Finance & Accounting', 'description' => 'Accountants, financial analysts, and roles in financial services.'],
            ['name' => 'Operations', 'description' => 'Roles focused on managing day-to-day operations in various sectors.'],
            ['name' => 'Food & Beverage', 'description' => 'Jobs in food production, restaurants, and catering services.'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'description' => $category['description'],
            ]);
        }
    }
}
