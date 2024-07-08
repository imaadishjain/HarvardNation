
const Category = require("../models/Category");
const Course = require("../models/Course");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
         
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.getCategoryPageDetails=async(req,res)=>
	{


		try
		{

          
		const {categoryId}=req.body;
		
	    const selectedCategory=await Category.findById(categoryId).populate("courses").exec();

		if(!selectedCategory)
			{
				res.status(200).json({
					success:false,
					message:"Data not found"
				})
			}
           
		if(selectedCategory.courses.length===0)
			{
				return res.status(200).json({
					success:false,
					message:"No courses found for the selected Category"
				})
			}
         //Get the other selected category
        
		 const categoriesExceptSelected=await Category.find(
			{_id:{$ne:categoryId},}
		 )
           
			let differentCategory=await Category.findById(
				categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
			)
			.populate({
				path:"courses",
				match:{
                  status:"Published"
				},
			}).exec();
 
            
		   const allCategories=await Category.find()
		   .populate({
			 path:"courses",
			 match:{
				status:"Published"
			 },
			 populate:{
				path:"instructor"
			 }
		   }).exec();
           
		   const allCourse=allCategories.flatMap((category)=> category.courses);
        
		   const mostSellingCourses = allCourse
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)


		/*const mostSellingCourse=await Course.aggregate(
			[
				{
				$addFields:{
                   studentEnrolledSize:{
					$size:{$ifNull:["$studentEnrolled",[]]
				   }
				}
			   } 
			   },
			   {
			   $sort:{
				studentEnrolledSize:-1
			   }
			   },
			   {
			   $limit:10
			   }
			]
		)*/

		 

		
          
			return res.status(200).json({
				success:true,
				data:{
					 selectedCategory,
					 differentCategory,
					mostSellingCourses
				}
			});           

		}catch(error)
		{
			console.log("Error in backend",error.message);
             return res.status(404).json({
				success:false,
				message:error.message
			  })
		}
	
	}