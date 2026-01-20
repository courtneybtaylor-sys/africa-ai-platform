"use server";

import { renderToStaticMarkup } from "react-dom/server";
import { 
  WelcomeEmail, 
  TripSavedEmail, 
  WeeklyDigestEmail 
} from "@/lib/emails/templates";

// Note: In production, you would integrate with an email service like:
// - Resend (resend.com)
// - SendGrid
// - AWS SES
// - Postmark
// For now, this logs emails in development

type EmailResult = {
  success: boolean;
  message: string;
};

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<EmailResult> {
  // In development, log the email
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Email would be sent:");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("---");
    return { success: true, message: "Email logged in development" };
  }

  // In production, integrate with your email provider
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "AfriTrek <hello@afritrek.com>",
  //   to,
  //   subject,
  //   html,
  // });

  return { success: true, message: "Email sent" };
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  plan: string
): Promise<EmailResult> {
  const html = renderToStaticMarkup(
    WelcomeEmail({ name: name || "Explorer", plan })
  );

  return sendEmail(
    email,
    `Welcome to AfriTrek, ${name || "Explorer"}!`,
    html
  );
}

export async function sendTripSavedEmail(
  email: string,
  name: string,
  tripTitle: string,
  destination: string,
  duration: string
): Promise<EmailResult> {
  const html = renderToStaticMarkup(
    TripSavedEmail({ name, tripTitle, destination, duration })
  );

  return sendEmail(
    email,
    `Your trip to ${destination} has been saved!`,
    html
  );
}

export async function sendWeeklyDigestEmail(
  email: string,
  name: string,
  data: {
    newCountries?: string[];
    forumHighlights?: { title: string; replies: number }[];
    featuredDestination?: { name: string; description: string };
  }
): Promise<EmailResult> {
  const html = renderToStaticMarkup(
    WeeklyDigestEmail({
      name,
      newCountries: data.newCountries,
      forumHighlights: data.forumHighlights,
      featuredDestination: data.featuredDestination,
    })
  );

  return sendEmail(
    email,
    "Your Weekly AfriTrek Digest",
    html
  );
}

// Email preference management
export type EmailPreferences = {
  welcomeEmails: boolean;
  tripNotifications: boolean;
  weeklyDigest: boolean;
  communityUpdates: boolean;
  marketingEmails: boolean;
};

export async function getEmailPreferences(userId: string): Promise<EmailPreferences> {
  // Default preferences - in production, fetch from database
  return {
    welcomeEmails: true,
    tripNotifications: true,
    weeklyDigest: true,
    communityUpdates: true,
    marketingEmails: false,
  };
}

export async function updateEmailPreferences(
  userId: string,
  preferences: Partial<EmailPreferences>
): Promise<EmailResult> {
  // In production, save to database
  console.log(`Updating email preferences for user ${userId}:`, preferences);
  return { success: true, message: "Preferences updated" };
}
