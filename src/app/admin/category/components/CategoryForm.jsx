"use client";
import { userValidationSchema } from "@/schemas/ValidationSchema";
import { post, update } from "@/utils/api";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const CategoryForm = ({ category, categories }) => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      const URL = reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewURL(reader.result);
      };
      setPreviewURL(URL);
    }
    formik.setValues({ ...formik.values, category_image: file });
  }, [file]);

  const formik = useFormik({
    initialValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      parent_id: category?.parent_id ?? "",
    },
    // validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (category) {
        try {
          const response = await update(
            `/api/category/${category.category_id}`,
            values
          );
          await router.push("/admin/category");
          await router.refresh();
          enqueueSnackbar("Category updated successfully", {
            variant: "success",
            preventDuplicate: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 3000,
            style: {
              background: "white",
              color: "black",
              borderRadius: ".5rem",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              padding: "0 4px",
            },
          });
        } catch (error) {
          enqueueSnackbar("Category updated failed", {
            variant: "error",
            preventDuplicate: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 3000,
            style: {
              background: "white",
              color: "black",
              borderRadius: ".5rem",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              padding: "0 4px",
            },
          });
        }
      } else {
        try {
          const response = await post("/api/category", values);
          await router.push("/admin/category");
          await router.refresh();
          enqueueSnackbar("Category created successfully", {
            variant: "success",
            preventDuplicate: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 3000,
            style: {
              background: "white",
              color: "black",
              borderRadius: ".5rem",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              padding: "0 4px",
            },
          });
        } catch (error) {
          enqueueSnackbar("Category created failed", {
            variant: "error",
            preventDuplicate: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 3000,
            style: {
              background: "white",
              color: "black",
              borderRadius: ".5rem",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              padding: "0 4px",
            },
          });
        }
      }
    },
  });
  return (
    <div className="mt-10 rounded-2xl shadow-3xl bg-white">
      <Formik initialValues={formik.initialValues}>
        <Form onSubmit={formik.handleSubmit} className=" rounded p-7 mb-4">
          <div className="flex flex-col gap-5">
            <div>
              <Select
                label="Parent Category"
                name="parent_id"
                value={formik.values?.parent_id ?? ""}
                onChange={(value) => formik.setFieldValue("parent_id", value)}
              >
                {categories?.map((category) => (
                  <Option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="mb-2 w-1/2">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formik.values?.name ?? ""}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <Input
                    label="Description"
                    type="text"
                    value={formik.values?.description ?? ""}
                    name="description"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </div>
              </div>
              {/* <div>
              <label
                htmlFor="dropzone-file"
                className="flex h-80 w-full flex-col items-center justify-center border-2 border-blueGray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {previewURL ? (
                  <img
                    src={previewURL}
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      className="text-blueGray-200"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M12 9.273c-2.301 0-4.167 1.831-4.167 4.09c0 2.26 1.866 4.092 4.167 4.092c2.301 0 4.167-1.832 4.167-4.091c0-2.26-1.866-4.091-4.167-4.091m0 1.636c-1.38 0-2.5 1.099-2.5 2.455c0 1.355 1.12 2.454 2.5 2.454s2.5-1.099 2.5-2.454c0-1.356-1.12-2.455-2.5-2.455m4.722-.818c0-.452.373-.818.834-.818h1.11c.46 0 .834.366.834.818a.826.826 0 0 1-.833.818h-1.111a.826.826 0 0 1-.834-.818"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  name="category_image"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div> */}

              <div className="flex items-center justify-between">
                <Button type="submit" loading={formik.isSubmitting}>
                  {category ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CategoryForm;
