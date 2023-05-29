import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import PostService from "../services/post";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function CreatePost(props:any) {

	const navigate = useNavigate();
	const { user } = props.user;

	useEffect(() => {
		if(user == "null" || user == undefined){
			navigate("/login");
		}
	},[user])

	const formik = useFormik({
		initialValues: {
			file: '',
			caption:'',
			tags: [],
			published: true,
			owner_id: 1
		},
		//file: string, caption: string, tags: string[], published: boolean, owner_id: number

		onSubmit: (values) => {
			PostService.create(
				values.file,
				values.caption,
				values.tags,
				values.published,
				values.owner_id
			);
		},
	})

	return (

		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Ajouter un post
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<form onSubmit={formik.handleSubmit}>
						<Stack spacing={4}>

							<FormControl id="file" isRequired>
								<FormLabel>Image</FormLabel>
								<Input type="file" id='file'
									   name='file'
									   onChange={formik.handleChange}
									   value={formik.values.file}/>
							</FormControl>

							<FormControl id="caption" isRequired>
								<FormLabel>Description</FormLabel>
								<Input type="text" id='caption'
									   name='caption'
									   onChange={formik.handleChange}
									   value={formik.values.caption}/>
							</FormControl>

							<FormControl id="tags" isRequired>
								<FormLabel>Tags</FormLabel>
								<Input type="text" id='tags'
									   name='tags'
									   onChange={formik.handleChange}
									   value={formik.values.tags}/>
							</FormControl>

							<Stack spacing={6} pt={2}>
								<Button
									loadingText="Soumission"
									size="lg"
									bg={"#13005A"}
									color={"white"}
									type="submit"
									_hover={{
										bg: "#2D07BC",
									}}

								>
									Ajouter
								</Button>
							</Stack>
						</Stack>
					</form>

				</Box>
			</Stack>
		</Flex>
	);
}