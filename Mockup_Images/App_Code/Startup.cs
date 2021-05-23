using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Mockup_Images.Startup))]
namespace Mockup_Images
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
