﻿// <auto-generated />
using System;
using AccessTransmitAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AccessTransmitAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AccessTransmitAPI.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("longtext");

                    b.Property<int>("Cuid")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UsernameT")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AccessTransmitAPI.Models.UserIMONITOR", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("IMONITORUserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("imonitorId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("UserIMONITOR");
                });

            modelBuilder.Entity("AccessTransmitAPI.Models.UserNCE", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AllowedLogins")
                        .HasColumnType("longtext");

                    b.Property<string>("AutoLogoutIfNoActivity")
                        .HasColumnType("longtext");

                    b.Property<string>("ClientIPAddressPolicy")
                        .HasColumnType("longtext");

                    b.Property<string>("CountryRegionCode")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<bool?>("DisableAccount")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .HasColumnType("longtext");

                    b.Property<bool?>("IsSuspended")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("LastLogin")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LoginTimePolicy")
                        .HasColumnType("longtext");

                    b.Property<int?>("MaxOnlineSessions")
                        .HasColumnType("int");

                    b.Property<string>("MobileNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("NCEUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<int?>("PasswordValidityPeriod")
                        .HasColumnType("int");

                    b.Property<string>("PersonalClientIPAddressPolicy")
                        .HasColumnType("longtext");

                    b.Property<string>("Region")
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("UserNCE");
                });

            modelBuilder.Entity("AccessTransmitAPI.Models.UserNFMP", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreationTime")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EnableIPAddressValidation")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ForceUserPasswordChange")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("InactiveDays")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastLogin")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MaxOSSSessionsAllowed")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MaxUserOperatorPositionsAllowed")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NFMPUserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OSSRequestPriority")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OSSRequestTimeoutSeconds")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PublicAlarmFilterForOSS")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RemoteUser")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ScopeOfCommandProfileID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ScopeOfCommandProfileName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SpanOfControlProfileID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SpanOfControlProfileName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserGroup")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserState")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ValidClientIPAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("usernfmp");
                });

            modelBuilder.Entity("AccessTransmitAPI.Models.UserNOMAD", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LdapPath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LdapServerName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NOMADUserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Profiles")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("UserNOMAD");
                });
#pragma warning restore 612, 618
        }
    }
}
