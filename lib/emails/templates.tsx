import * as React from "react";

// Base email wrapper
export function EmailWrapper({ 
  children, 
  previewText 
}: { 
  children: React.ReactNode;
  previewText?: string;
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AfriTrek</title>
      </head>
      <body style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#F5F0E6",
        margin: 0,
        padding: 0,
      }}>
        {previewText && (
          <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
            {previewText}
          </div>
        )}
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#F5F0E6" }}>
          <tr>
            <td align="center" style={{ padding: "40px 20px" }}>
              <table width="600" cellPadding="0" cellSpacing="0" style={{ 
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}>
                {/* Header */}
                <tr>
                  <td style={{
                    backgroundColor: "#1C1917",
                    padding: "30px",
                    textAlign: "center" as const,
                  }}>
                    <h1 style={{
                      margin: 0,
                      color: "#D4A853",
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}>
                      AfriTrek
                    </h1>
                    <p style={{
                      margin: "8px 0 0",
                      color: "#A8A29E",
                      fontSize: "14px",
                    }}>
                      Your Gateway to Africa
                    </p>
                  </td>
                </tr>
                {/* Content */}
                <tr>
                  <td style={{ padding: "40px 30px" }}>
                    {children}
                  </td>
                </tr>
                {/* Footer */}
                <tr>
                  <td style={{
                    backgroundColor: "#F5F0E6",
                    padding: "30px",
                    textAlign: "center" as const,
                    borderTop: "1px solid #E7E5E4",
                  }}>
                    <p style={{
                      margin: 0,
                      color: "#78716C",
                      fontSize: "12px",
                    }}>
                      AfriTrek - Explore, Relocate, Thrive in Africa
                    </p>
                    <p style={{
                      margin: "8px 0 0",
                      color: "#A8A29E",
                      fontSize: "11px",
                    }}>
                      You are receiving this email because you signed up for AfriTrek.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

// Welcome Email
export function WelcomeEmail({ name, plan }: { name: string; plan: string }) {
  const planName = plan === "pioneer" ? "Pioneer" : plan === "voyager" ? "Voyager" : "Explorer";
  
  return (
    <EmailWrapper previewText={`Welcome to AfriTrek, ${name}!`}>
      <h2 style={{
        margin: "0 0 20px",
        color: "#1C1917",
        fontSize: "24px",
      }}>
        Welcome to AfriTrek, {name}!
      </h2>
      <p style={{
        margin: "0 0 20px",
        color: "#44403C",
        fontSize: "16px",
        lineHeight: "1.6",
      }}>
        We are thrilled to have you join our community of travelers, relocators, and digital nomads exploring the incredible continent of Africa.
      </p>
      <div style={{
        backgroundColor: "#D4A853",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}>
        <p style={{
          margin: 0,
          color: "#1C1917",
          fontSize: "14px",
          fontWeight: "bold",
        }}>
          Your Plan: {planName}
        </p>
      </div>
      <p style={{
        margin: "0 0 20px",
        color: "#44403C",
        fontSize: "16px",
        lineHeight: "1.6",
      }}>
        Here is what you can do with AfriTrek:
      </p>
      <ul style={{
        margin: "0 0 20px",
        paddingLeft: "20px",
        color: "#44403C",
        fontSize: "14px",
        lineHeight: "1.8",
      }}>
        <li>Explore 54 African countries with detailed guides</li>
        <li>Use AI-powered trip planning and visa checking</li>
        <li>Connect with our community of Africa enthusiasts</li>
        <li>Save your favorite destinations and trip plans</li>
      </ul>
      <a
        href="https://afritrek.com/countries"
        style={{
          display: "inline-block",
          backgroundColor: "#D4A853",
          color: "#1C1917",
          padding: "14px 28px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Start Exploring
      </a>
    </EmailWrapper>
  );
}

// Trip Saved Email
export function TripSavedEmail({ 
  name, 
  tripTitle, 
  destination, 
  duration 
}: { 
  name: string; 
  tripTitle: string;
  destination: string;
  duration: string;
}) {
  return (
    <EmailWrapper previewText={`Your trip to ${destination} has been saved!`}>
      <h2 style={{
        margin: "0 0 20px",
        color: "#1C1917",
        fontSize: "24px",
      }}>
        Trip Saved Successfully!
      </h2>
      <p style={{
        margin: "0 0 20px",
        color: "#44403C",
        fontSize: "16px",
        lineHeight: "1.6",
      }}>
        Hi {name}, your trip plan has been saved to your dashboard.
      </p>
      <div style={{
        backgroundColor: "#F5F0E6",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        border: "1px solid #E7E5E4",
      }}>
        <h3 style={{
          margin: "0 0 10px",
          color: "#1C1917",
          fontSize: "18px",
        }}>
          {tripTitle}
        </h3>
        <p style={{
          margin: 0,
          color: "#78716C",
          fontSize: "14px",
        }}>
          {destination} • {duration}
        </p>
      </div>
      <a
        href="https://afritrek.com/dashboard?tab=trips"
        style={{
          display: "inline-block",
          backgroundColor: "#D4A853",
          color: "#1C1917",
          padding: "14px 28px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        View Your Trips
      </a>
    </EmailWrapper>
  );
}

// Weekly Digest Email
export function WeeklyDigestEmail({ 
  name, 
  newCountries,
  forumHighlights,
  featuredDestination,
}: { 
  name: string;
  newCountries?: string[];
  forumHighlights?: { title: string; replies: number }[];
  featuredDestination?: { name: string; description: string };
}) {
  return (
    <EmailWrapper previewText="Your weekly AfriTrek digest is here!">
      <h2 style={{
        margin: "0 0 20px",
        color: "#1C1917",
        fontSize: "24px",
      }}>
        Your Weekly AfriTrek Digest
      </h2>
      <p style={{
        margin: "0 0 20px",
        color: "#44403C",
        fontSize: "16px",
        lineHeight: "1.6",
      }}>
        Hi {name}, here is what is happening in the AfriTrek community this week.
      </p>
      
      {featuredDestination && (
        <div style={{
          backgroundColor: "#5B8C5A",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}>
          <p style={{
            margin: "0 0 8px",
            color: "#FFFFFF",
            fontSize: "12px",
            textTransform: "uppercase" as const,
            letterSpacing: "1px",
          }}>
            Featured Destination
          </p>
          <h3 style={{
            margin: "0 0 8px",
            color: "#FFFFFF",
            fontSize: "20px",
          }}>
            {featuredDestination.name}
          </h3>
          <p style={{
            margin: 0,
            color: "#E8F4E8",
            fontSize: "14px",
          }}>
            {featuredDestination.description}
          </p>
        </div>
      )}

      {forumHighlights && forumHighlights.length > 0 && (
        <>
          <h3 style={{
            margin: "20px 0 15px",
            color: "#1C1917",
            fontSize: "18px",
          }}>
            Hot Discussions
          </h3>
          {forumHighlights.map((post, i) => (
            <div key={i} style={{
              padding: "12px 0",
              borderBottom: i < forumHighlights.length - 1 ? "1px solid #E7E5E4" : "none",
            }}>
              <p style={{
                margin: 0,
                color: "#1C1917",
                fontSize: "14px",
                fontWeight: "500",
              }}>
                {post.title}
              </p>
              <p style={{
                margin: "4px 0 0",
                color: "#78716C",
                fontSize: "12px",
              }}>
                {post.replies} replies
              </p>
            </div>
          ))}
        </>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" as const }}>
        <a
          href="https://afritrek.com/community"
          style={{
            display: "inline-block",
            backgroundColor: "#D4A853",
            color: "#1C1917",
            padding: "14px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Visit Community
        </a>
      </div>
    </EmailWrapper>
  );
}
