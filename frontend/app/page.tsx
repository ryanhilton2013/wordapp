"use client"
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import  AboutWord from '@/components/AboutWord'; 
import  ErrorBox from '@/components/ui/ErrorBox'; 

const wordValidation = new RegExp(
  /^[a-zA-Z0-9-]+$/ 
);

export default function Home() {
  const [word, setWord] = useState<string>('');
  const [aboutWord, setAboutWord] = useState<string[]>([]); 
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const formSchema = z.object({
    word: z.string()
    .nonempty({
        message: "Required",
      })    
    .max(64, {
        message: "The word must be less than 64 characters."
      })
    .regex(wordValidation, {
        message: 'The word can only contain letters or numbers.',
      })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const searchWord = values.word;
    const data = await fetchData(searchWord)
      .then(data => {
        if(data.definitions.length){
          setErrorMessage("");   
          setWord(searchWord);             
          setAboutWord(data.definitions);  
        } else {
          setWord(searchWord);             
          setAboutWord([]);  
          setErrorMessage(`No definition found for the word ${searchWord}.`);   
        }
      })
      .catch (err => {
        setWord("");             
        setAboutWord([]);
        setErrorMessage(err);
      });
  }
  const fetchData = async (word: string): Promise<any> => {
    try {
      const response = await fetch(`/api/words/${word}`);
      if (!response.ok) {
        if (response.status === 404) {
          return Promise.reject(`Word not found: ${word}`);  
        } else if (response.status === 401) {
          return Promise.reject(`Error communicating with server, contact support`);
        } else {
          return Promise.reject(`Unexpected error: ${response.status}`);          
        }
      }      
      const data = await response.json();
      return data;
    } catch(err){
      console.log(err);
      return Promise.reject("Unknown Error");
    }
  };  

  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-24">
      <h1 className="text-2xl" >Word Definition</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md  w-full ">
          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Any Word:</FormLabel>
                <FormControl>
                  <Input placeholder="a single word" type="string" {...field} />
                </FormControl>
                <FormDescription>
                  Enter any word to get its definition(s).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>  
      <ErrorBox description={errorMessage} />
      <AboutWord definitions={aboutWord} word={word} />
    </main>
  );
}
