using CartProduct.Data;
using CartProduct.Data.Entities.Identity;
using CartProduct.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using CartProduct.Services;
using System.IO;
using Microsoft.Extensions.FileProviders;
using FluentValidation.AspNetCore;

namespace CartProduct
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews()
                .AddNewtonsoftJson(opts => {
                    opts.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    opts.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
                    opts.SerializerSettings.ContractResolver = 
                    new CamelCasePropertyNamesContractResolver();
                });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "frontend/build";
            });

            services.AddSwaggerGen((SwaggerGenOptions opt) => {
                opt.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Version = "v1",
                    Title = "CartProduct",
                    Description = "Swagger of my Project"
                });
            });

            services.AddScoped<IJwtTokenService, JwtTokenService>();

            services.AddDbContext<EFContext>((DbContextOptionsBuilder builder) => {
                builder.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<AppUser, AppRole>((IdentityOptions opts) => {
                opts.Password.RequireDigit = false;
                opts.Password.RequiredLength = 6;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireUppercase = false;
            })
            .AddEntityFrameworkStores<EFContext>()
            .AddDefaultTokenProviders();

            services.AddAutoMapper(typeof(MyAutoMapper));

            services.AddFluentValidation(opts =>
            opts.RegisterValidatorsFromAssemblyContaining<Startup>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI((SwaggerUIOptions opts) => {
                    opts.SwaggerEndpoint("/swagger/v1/swagger.json", "CartProduct v1");
                });
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.SeedAll();

            string dir = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            if (!Directory.Exists(dir)) 
            {
                Directory.CreateDirectory(dir);
            }

            app.UseStaticFiles(new StaticFileOptions { 
                RequestPath = "/images",
                FileProvider = new PhysicalFileProvider(dir)
            });

                app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "frontend";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
