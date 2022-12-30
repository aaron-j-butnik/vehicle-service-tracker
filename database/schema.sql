set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."vehicle" (
	"vehicleId" serial NOT NULL,
	"year" integer NOT NULL,
	"make" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"licensePlate" TEXT NOT NULL,
	"odometer" integer NOT NULL,
	"notes" TEXT NOT NULL,
	-- "createdAt" TIMESTAMP NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "vehicle_pk" PRIMARY KEY ("vehicleId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."service" (
	"serviceId" serial NOT NULL,
	"serviceDate" TEXT NOT NULL,
	"servicePerformedBy" TEXT NOT NULL,
	"typeOfService" TEXT NOT NULL,
	"odometerAtService" integer NOT NULL,
	"cost" integer NOT NULL,
	"serviceNotes" TEXT NOT NULL,
	-- "createdAt" TIMESTAMP NOT NULL,
	"vehicleId" integer NOT NULL,
	CONSTRAINT "service_pk" PRIMARY KEY ("serviceId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	-- "createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "service" ADD CONSTRAINT "service_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("vehicleId");
