
import express, { Application, Request, Response } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser"
import { categoryRoute } from "./modules/category/category.route";
import { propertyRoute } from "./modules/property/property.route";
import { landlordPropertyRoute } from "./modules/property/landlordProperty.route";
import { rentalRequestRoutes } from "./modules/rentalRequest/rentalRequest.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { paymentRoute } from "./modules/payment/payment.route";
import { reviewRoutes } from "./modules/review/review.route";
import { adminRoute } from "./modules/admin/admin.route";


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.get("/", (req: Request, res: Response) => {
    res.send("rentnest server is running")
})

app.use("/api/auth", authRoutes);

app.use("/api/categories",categoryRoute);

app.use("/api/properties",propertyRoute);

app.use("/api/landlord/properties",landlordPropertyRoute);


app.use("/api",rentalRequestRoutes);
app.use("/api/payments",paymentRoute);
app.use("/api/reviews",reviewRoutes);
app.use("/api/admin",adminRoute)

app.use(notFound)
  app.use(globalErrorHandler)

export default app;